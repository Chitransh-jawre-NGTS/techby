import React, { useState, useEffect } from "react";
import {
  MapPin,
  X,
  Navigation,
  Loader2,
  Clock3,
  Search,
} from "lucide-react";

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
  const [searchLoading, setSearchLoading] =
    useState(false);

  // =========================
  // LOAD RECENT
  // =========================
  useEffect(() => {
    const saved =
      JSON.parse(
        localStorage.getItem("recent_locations")
      ) || [];

    setRecent(saved);
  }, []);

  // =========================
  // SAVE RECENT
  // =========================
  const saveToRecent = (location) => {
    const updated = [
      location,
      ...recent.filter((i) => i !== location),
    ].slice(0, 6);

    setRecent(updated);

    localStorage.setItem(
      "recent_locations",
      JSON.stringify(updated)
    );
  };

  // =========================
  // AUTOCOMPLETE SEARCH
  // =========================
  useEffect(() => {
    if (!search.trim()) {
      setSearchLoading(false);
      return;
    }

    setSearchLoading(true);

    const timer = setTimeout(async () => {
      try {
        await dispatch(fetchAutocomplete(search));
      } finally {
        setSearchLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [search, dispatch]);

  // =========================
  // CLOSE
  // =========================
  if (!open) return null;

  // =========================
  // DETECT LOCATION
  // =========================
  const detectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        dispatch(
          fetchReverseGeocode({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          })
        );
      },
      () => {
        alert(
          "Unable to fetch your current location"
        );
      }
    );
  };

  // =========================
  // HANDLE SELECT
  // =========================
  const handleSelect = (locationName) => {
    onSelectCity(locationName);

    saveToRecent(locationName);

    dispatch(clearLocationState());

    onClose();
  };

  const list = search
    ? autocompleteResults
    : [];

  return (
    <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn">

      {/* MODAL */}
      <div className="w-full sm:max-w-lg bg-white h-[92vh] sm:h-[85vh] rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col">

        {/* HEADER */}
        <div className="sticky top-0 z-20 bg-white border-b px-5 pt-5 pb-4">

          <div className="flex items-center justify-between">

            <div>
              <h2 className="text-xl font-bold text-gray-800">
                Select Location
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Find products near you
              </p>
            </div>

            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
            >
              <X size={20} />
            </button>
          </div>

          {/* SEARCH */}
          <div className="relative mt-5">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search city, district, state..."
              className="w-full bg-gray-100 border border-transparent focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none rounded-2xl py-3.5 pl-11 pr-4 text-sm transition"
            />

            {searchLoading && (
              <Loader2
                size={18}
                className="absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-green-600"
              />
            )}
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto px-5 py-4">

          {/* CURRENT LOCATION BUTTON */}
          <button
            onClick={detectLocation}
            className="w-full bg-green-600 hover:bg-green-700 active:scale-[0.99] transition text-white rounded-2xl py-4 flex items-center justify-center gap-2 font-medium shadow-lg shadow-green-100"
          >
            {loading ? (
              <>
                <Loader2
                  size={18}
                  className="animate-spin"
                />
                Detecting location...
              </>
            ) : (
              <>
                <Navigation size={18} />
                Use Current Location
              </>
            )}
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
              className="mt-4 p-4 rounded-2xl border border-green-200 bg-gradient-to-r from-green-50 to-green-100 cursor-pointer hover:shadow-md transition"
            >
              <div className="flex items-start gap-3">

                <div className="bg-green-600 text-white p-2 rounded-xl">
                  <MapPin size={16} />
                </div>

                <div>
                  <p className="font-semibold text-gray-800">
                    Current Location
                  </p>

                  <p className="text-sm text-gray-600 mt-1">
                    {currentLocation.display_place ||
                      "Detected Location"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* RECENT SEARCHES */}
          {!search && recent.length > 0 && (
            <div className="mt-6">

              <div className="flex items-center gap-2 mb-3">
                <Clock3
                  size={16}
                  className="text-gray-500"
                />

                <p className="text-sm font-semibold text-gray-700">
                  Recent Searches
                </p>
              </div>

              <div className="space-y-2">
                {recent.map((item, i) => (
                  <div
                    key={i}
                    onClick={() =>
                      handleSelect(item)
                    }
                    className="p-4 rounded-2xl border bg-white hover:bg-gray-50 cursor-pointer transition flex items-center gap-3"
                  >
                    <div className="bg-gray-100 p-2 rounded-xl">
                      <MapPin
                        size={16}
                        className="text-gray-600"
                      />
                    </div>

                    <div className="text-sm font-medium text-gray-700">
                      {item}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SEARCH RESULTS */}
          {search && (
            <div className="mt-5">

              {!searchLoading &&
                list.length === 0 && (
                  <div className="flex flex-col items-center justify-center text-center py-14">

                    <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                      <Search
                        size={28}
                        className="text-gray-400"
                      />
                    </div>

                    <p className="font-semibold text-gray-700">
                      No locations found
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      Try searching another city or district
                    </p>
                  </div>
                )}

              <div className="space-y-3">

                {list.map((item, i) => {
                  const district =
                    item.address?.county ||
                    item.address?.city ||
                    item.display_place;

                  const name =
                    item.display_place ||
                    item.address?.name ||
                    item.display_name?.split(
                      ","
                    )[0];

                  const state =
                    item.address?.state || "";

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
                      className="group p-4 rounded-2xl border bg-white hover:border-green-500 hover:bg-green-50 transition cursor-pointer"
                    >
                      <div className="flex gap-3">

                        <div className="bg-gray-100 group-hover:bg-green-100 p-2 rounded-xl transition">
                          <MapPin
                            size={17}
                            className="text-gray-700"
                          />
                        </div>

                        <div className="flex-1 min-w-0">

                          <p className="font-semibold text-sm text-gray-800 truncate">
                            {district} • {name}
                          </p>

                          <p className="text-xs text-gray-500 mt-1 truncate">
                            {state}
                          </p>

                          <p className="text-xs text-gray-400 mt-1 truncate">
                            {item.display_name}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="border-t bg-white px-5 py-3 text-center text-xs text-gray-400">
          Showing nearby products based on location
        </div>
      </div>
    </div>
  );
};

export default LocationModal;