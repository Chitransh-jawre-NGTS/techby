import React, { useState, useEffect } from "react";
import { MapPin, X, Navigation } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchReverseGeocode,
  fetchAutocomplete,
  clearLocationState,
} from "../store/slices/locationSlice";

const LocationModal = ({
  open,
  onClose,
  selectedCity,
  onSelectCity,
}) => {
  const dispatch = useDispatch();

  const {
    autocompleteResults,
    loading,
    currentLocation,
  } = useSelector((state) => state.location);

  const [search, setSearch] = useState("");
  const [recent, setRecent] = useState([]);

  // =========================
  // LOAD RECENT FROM LOCALSTORAGE
  // =========================
  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("recent_locations")) || [];
    setRecent(saved);
  }, []);

  // =========================
  // SAVE RECENT LOCATION
  // =========================
  const saveToRecent = (location) => {
    const updated = [
      location,
      ...recent.filter((i) => i !== location),
    ].slice(0, 5);

    setRecent(updated);
    localStorage.setItem(
      "recent_locations",
      JSON.stringify(updated)
    );
  };

  // =========================
  // AUTOCOMPLETE SEARCH (DEBOUNCE)
  // =========================
  useEffect(() => {
    if (!search.trim()) return;

    const timer = setTimeout(() => {
      dispatch(fetchAutocomplete(search));
    }, 400);

    return () => clearTimeout(timer);
  }, [search, dispatch]);

  // =========================
  // CLOSE MODAL CHECK
  // =========================
  if (!open) return null;

  // =========================
  // DETECT LOCATION
  // =========================
  const detectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition((pos) => {
      dispatch(
        fetchReverseGeocode({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        })
      );
    });
  };

  // =========================
  // SELECT LOCATION
  // =========================
  const handleSelect = (locationName) => {
    onSelectCity(locationName);
    saveToRecent(locationName);
    dispatch(clearLocationState());
    onClose();
  };

  const list = search ? autocompleteResults : [];

  return (
    <div className="fixed inset-0 z-[1000] flex items-end sm:items-center justify-center bg-black/60">

      <div className="bg-white w-full sm:max-w-md h-[90vh] sm:h-auto p-5 relative flex flex-col rounded-t-2xl sm:rounded-2xl">

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3"
        >
          <X />
        </button>

        {/* TITLE */}
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="text-green-600" />
          <h2 className="text-lg font-semibold">
            Choose Location
          </h2>
        </div>

        {/* CURRENT LOCATION */}
        <button
          onClick={detectLocation}
          className="w-full py-3 mb-4 bg-green-600 text-white rounded-xl flex items-center justify-center gap-2"
        >
          <Navigation size={18} />
          {loading ? "Detecting..." : "Use current location"}
        </button>

        {/* DETECTED LOCATION */}
        {currentLocation && (
          <div
            onClick={() =>
              handleSelect(
                currentLocation.display_place ||
                  currentLocation.address?.name ||
                  currentLocation.city
              )
            }
            className="p-3 mb-3 border rounded-xl bg-green-50 cursor-pointer"
          >
            📍 {currentLocation.display_place || "Detected Location"}
          </div>
        )}

        {/* SEARCH INPUT */}
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search city, district..."
          className="w-full border rounded-xl px-4 py-3 mb-4"
        />

        {/* RECENT SEARCHES */}
        {!search && recent.length > 0 && (
          <div className="mb-3">
            <p className="text-xs text-gray-500 mb-2">
              Recent Searches
            </p>

            {recent.map((item, i) => (
              <div
                key={i}
                onClick={() => handleSelect(item)}
                className="p-2 border rounded-lg mb-2 cursor-pointer hover:bg-gray-50"
              >
                📍 {item}
              </div>
            ))}
          </div>
        )}

        {/* RESULTS */}
        <div className="flex-1 overflow-y-auto space-y-2">

          {search && list.length === 0 && (
            <p className="text-sm text-gray-400 text-center mt-4">
              No results found
            </p>
          )}

          {list.map((item, i) => {
            const district =
              item.address?.county ||
              item.address?.city ||
              item.display_place;

            const name =
              item.display_place ||
              item.address?.name ||
              item.display_name?.split(",")[0];

            const state =
              item.address?.state ||
              "";

            return (
              <div
                key={item.place_id || i}
                onClick={() =>
                  handleSelect(
                    item.display_place ||
                      item.address?.name ||
                      item.display_name
                  )
                }
                className="p-3 border rounded-xl hover:bg-green-50 cursor-pointer"
              >
                {/* SINGLE LINE FORMAT */}
                <div className="font-medium text-sm text-gray-800">
                  📍 {district} • {name} • {state}
                </div>

                {/* SMALL ADDRESS */}
                <div className="text-xs text-gray-500 mt-1 truncate">
                  {item.display_name}
                </div>
              </div>
            );
          })}

        </div>

      </div>
    </div>
  );
};

export default LocationModal;