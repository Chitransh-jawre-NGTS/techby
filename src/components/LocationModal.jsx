import React, { useState, useEffect } from "react";
import { MapPin, X, Navigation, Loader2, Clock3, Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchReverseGeocode,
  fetchAutocomplete,
  clearLocationState,
} from "../store/slices/locationSlice";

const LocationModal = ({ open, onClose, selectedCity, onSelectCity }) => {
  const dispatch = useDispatch();

  const { autocompleteResults, loading, currentLocation } = useSelector(
    (state) => state.location
  );

  const [search, setSearch] = useState("");
  const [recent, setRecent] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  // ================= LOAD RECENT =================
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("recent_locations")) || [];
    setRecent(saved);
  }, []);

  // ================= SAVE RECENT =================
  const saveToRecent = (locationObj) => {
    const updated = [
      locationObj,
      ...recent.filter(
        (i) => i?.display_name !== locationObj?.display_name
      ),
    ].slice(0, 6);

    setRecent(updated);

    localStorage.setItem("recent_locations", JSON.stringify(updated));
  };

  // ================= AUTOCOMPLETE =================
  useEffect(() => {
    if (!search.trim()) return;

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

  if (!open) return null;

  // ================= DETECT LOCATION =================
  const detectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
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
      () => alert("Unable to fetch location")
    );
  };

  // ================= HANDLE SELECT =================
  const handleSelect = (locationObj) => {
    if (!locationObj) return;

    // send to parent
    onSelectCity(locationObj);

    // save full object in localStorage
    localStorage.setItem("selectedCity", JSON.stringify(locationObj));

    // save recent
    saveToRecent(locationObj);

    dispatch(clearLocationState());

    onClose();
  };

  const list = search ? autocompleteResults : [];

  return (
    <div className="fixed inset-0 z-[9999] bg-black/60 flex items-end sm:items-center justify-center p-0 sm:p-4">

      <div className="w-full sm:max-w-lg bg-white h-[92vh] sm:h-[85vh] rounded-t-3xl sm:rounded-3xl flex flex-col overflow-hidden">

        {/* HEADER */}
        <div className="px-5 pt-5 pb-4 border-b">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold">Select Location</h2>
              <p className="text-sm text-gray-500">Find products near you</p>
            </div>

            <button onClick={onClose} className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <X />
            </button>
          </div>

          {/* SEARCH */}
          <div className="relative mt-5">
            <Search className="absolute left-4 top-3 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search city..."
              className="w-full bg-gray-100 rounded-2xl py-3 pl-11 pr-4 outline-none"
            />

            {searchLoading && (
              <Loader2 className="absolute right-4 top-3 animate-spin text-green-600" />
            )}
          </div>
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto px-5 py-4">

          {/* CURRENT LOCATION */}
          <button
            onClick={detectLocation}
            className="w-full bg-green-600 text-white py-3 rounded-xl"
          >
            {loading ? "Detecting..." : "Use Current Location"}
          </button>

          {/* CURRENT LOCATION CARD */}
          {currentLocation && (
            <div
              onClick={() => handleSelect(currentLocation)}
              className="mt-4 p-4 border rounded-xl cursor-pointer"
            >
              <p className="font-semibold">Current Location</p>
              <p className="text-sm text-gray-600">
                {currentLocation.display_place || currentLocation.city}
              </p>
            </div>
          )}

          {/* RECENT */}
          {!search && recent.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                <Clock3 size={14} /> Recent
              </h3>

              {recent.map((item, i) => (
                <div
                  key={i}
                  onClick={() => handleSelect(item)}
                  className="p-3 border rounded-xl mb-2 cursor-pointer"
                >
                  {item?.city || item?.display_place}
                </div>
              ))}
            </div>
          )}

          {/* SEARCH RESULTS */}
          {search && (
            <div className="mt-5">
              {list.map((item, i) => (
                <div
                  key={i}
                  onClick={() => handleSelect(item)}
                  className="p-3 border rounded-xl mb-2 cursor-pointer"
                >
                  {item?.display_place || item?.city || item?.display_name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationModal;