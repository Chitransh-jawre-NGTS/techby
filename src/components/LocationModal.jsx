import React, {
  useState,
  useEffect,
} from "react";

import {
  MapPin,
  X,
  Navigation,
  Loader2,
  Clock3,
  Search,
  LocateFixed,
  ChevronRight,
} from "lucide-react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

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
  } = useSelector(
    (state) => state.location
  );

  const [search, setSearch] =
    useState("");

  const [recent, setRecent] =
    useState([]);

  const [searchLoading, setSearchLoading] =
    useState(false);

  // =====================================
  // LOAD RECENT
  // =====================================

  useEffect(() => {

    const saved =
      JSON.parse(
        localStorage.getItem(
          "recent_locations"
        )
      ) || [];

    setRecent(saved);

  }, []);

  // =====================================
  // SAVE RECENT
  // =====================================

  const saveToRecent = (
    locationObj
  ) => {

    const updated = [
      locationObj,
      ...recent.filter(
        (i) =>
          i?.display_name !==
          locationObj?.display_name
      ),
    ].slice(0, 6);

    setRecent(updated);

    localStorage.setItem(
      "recent_locations",
      JSON.stringify(updated)
    );
  };

  // =====================================
  // SEARCH
  // =====================================

  useEffect(() => {

    if (!search.trim())
      return;

    setSearchLoading(true);

    const timer =
      setTimeout(async () => {

        try {

          await dispatch(
            fetchAutocomplete(
              search
            )
          );

        } finally {

          setSearchLoading(false);
        }
      }, 500);

    return () =>
      clearTimeout(timer);

  }, [search, dispatch]);

  // =====================================
  // DETECT LOCATION
  // =====================================

  const detectLocation =
    () => {

      if (
        !navigator.geolocation
      ) {

        alert(
          "Geolocation not supported"
        );

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
        () =>
          alert(
            "Unable to fetch location"
          )
      );
    };

  // =====================================
  // HANDLE SELECT
  // =====================================

  const handleSelect = (
    locationObj
  ) => {

    if (!locationObj)
      return;

    onSelectCity(locationObj);

    localStorage.setItem(
      "selectedCity",
      JSON.stringify(locationObj)
    );

    saveToRecent(locationObj);

    dispatch(
      clearLocationState()
    );

    onClose();
  };

  if (!open) return null;

  const list = search
    ? autocompleteResults
    : [];

  return (
    <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center">

      {/* MODAL */}

      <div className="w-full sm:max-w-xl bg-white h-[92vh] sm:h-[88vh] rounded-t-[32px] sm:rounded-[32px] flex flex-col overflow-hidden animate-slideUp">

        {/* ================================= */}
        {/* HEADER */}
        {/* ================================= */}

        <div className="relative bg-gradient-to-br from-green-500 via-green-600 to-emerald-700 px-5 pt-6 pb-8 text-white">

          {/* CLOSE */}

          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center"
          >

            <X size={20} />

          </button>

          {/* TITLE */}

          <div className="mt-3">

            <h2 className="text-3xl font-black">

              Select Location

            </h2>

            <p className="text-green-100 mt-1 text-sm">

              Find products &
              sellers near you

            </p>
          </div>

          {/* SEARCH */}

          <div className="relative mt-6">

            <Search className="absolute left-4 top-4 text-gray-400" />

            <input
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              placeholder="Search city, area, state..."
              className="w-full bg-white text-gray-800 rounded-2xl py-4 pl-12 pr-12 outline-none shadow-lg font-medium"
            />

            {searchLoading && (

              <Loader2 className="absolute right-4 top-4 animate-spin text-green-600" />

            )}
          </div>
        </div>

        {/* ================================= */}
        {/* BODY */}
        {/* ================================= */}

        <div className="flex-1 overflow-y-auto bg-gray-50 px-4 py-5">

          {/* CURRENT LOCATION BUTTON */}

          <button
            onClick={
              detectLocation
            }
            className="w-full bg-white rounded-3xl p-5 shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition"
          >

            <div className="flex items-center gap-4">

              <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">

                {loading ? (

                  <Loader2 className="animate-spin text-green-600" />

                ) : (

                  <LocateFixed className="text-green-600" />

                )}
              </div>

              <div className="text-left">

                <h3 className="font-bold text-gray-800">

                  Use Current Location

                </h3>

                <p className="text-sm text-gray-500 mt-1">

                  Detect your live location instantly

                </p>
              </div>
            </div>

            <ChevronRight className="text-gray-400" />
          </button>

          {/* CURRENT LOCATION */}

          {currentLocation && (

            <div className="mt-5">

              <p className="text-xs font-bold text-gray-400 uppercase mb-3 px-1">

                Current Location

              </p>

              <div
                onClick={() =>
                  handleSelect(
                    currentLocation
                  )
                }
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-3xl p-5 shadow-lg cursor-pointer"
              >

                <div className="flex items-start gap-4">

                  <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">

                    <Navigation size={22} />

                  </div>

                  <div className="flex-1">

                    <h3 className="font-bold text-lg">

                      {
                        currentLocation?.city
                      }

                    </h3>

                    <p className="text-sm text-green-100 mt-1 leading-relaxed">

                      {
                        currentLocation?.display_place ||
                        currentLocation?.display_name
                      }

                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* RECENT */}

          {!search &&
            recent.length >
              0 && (

              <div className="mt-7">

                <div className="flex items-center gap-2 mb-4 px-1">

                  <Clock3
                    size={16}
                    className="text-gray-500"
                  />

                  <h3 className="text-sm font-bold text-gray-700 uppercase">

                    Recent Locations

                  </h3>
                </div>

                <div className="space-y-3">

                  {recent.map(
                    (
                      item,
                      i
                    ) => (

                      <div
                        key={i}
                        onClick={() =>
                          handleSelect(
                            item
                          )
                        }
                        className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between cursor-pointer hover:shadow-md transition"
                      >

                        <div className="flex items-start gap-3">

                          <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center">

                            <MapPin
                              size={
                                18
                              }
                              className="text-green-600"
                            />

                          </div>

                          <div>

                            <h4 className="font-semibold text-gray-800">

                              {item?.city ||
                                item?.display_place}

                            </h4>

                            <p className="text-xs text-gray-500 mt-1 line-clamp-1">

                              {
                                item?.display_name
                              }

                            </p>
                          </div>
                        </div>

                        <ChevronRight className="text-gray-300" />
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

          {/* SEARCH RESULTS */}

          {search && (

            <div className="mt-3">

              <div className="flex items-center justify-between mb-4 px-1">

                <h3 className="text-sm font-bold text-gray-700 uppercase">

                  Search Results

                </h3>

                <span className="text-xs text-gray-400">

                  {
                    list?.length
                  }{" "}
                  found

                </span>
              </div>

              <div className="space-y-3">

                {list?.length ===
                0 ? (

                  <div className="text-center py-16">

                    <MapPin className="mx-auto text-gray-300 w-14 h-14" />

                    <h3 className="mt-4 text-lg font-bold text-gray-700">

                      No Locations Found

                    </h3>

                    <p className="text-sm text-gray-500 mt-2">

                      Try searching another city or area

                    </p>
                  </div>

                ) : (

                  list.map(
                    (
                      item,
                      i
                    ) => (

                      <div
                        key={i}
                        onClick={() =>
                          handleSelect(
                            item
                          )
                        }
                        className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 cursor-pointer hover:border-green-400 hover:shadow-md transition"
                      >

                        <div className="flex items-start gap-4">

                          <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center flex-shrink-0">

                            <MapPin className="text-green-600" />

                          </div>

                          <div className="flex-1 min-w-0">

                            <h3 className="font-bold text-gray-800 truncate">

                              {item?.city ||
                                item?.display_place}

                            </h3>

                            <p className="text-sm text-gray-500 mt-1 leading-relaxed">

                              {item?.display_name}

                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationModal;