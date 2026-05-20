import HttpClient from "../utils/HttpClient";

/*
========================================
✅ HEALTH CHECK
========================================
*/
export const checkLocationApi = () => {
  return HttpClient.get("/location");
};

/*
========================================
✅ REVERSE GEOCODE (lat/lng → address)
========================================
*/
export const reverseGeocode = (lat, lng) => {
  return HttpClient.get(
    `/location/rev_geocode?lat=${lat}&lng=${lng}`
  );
};

/*
========================================
✅ SEARCH LOCATION
========================================
*/
export const searchLocation = (query) => {
  return HttpClient.get(
    `/location/search?query=${query}`
  );
};

/*
========================================
✅ AUTOCOMPLETE
========================================
*/
export const autocompleteLocation = (query) => {
  return HttpClient.get(
    `/location/autocomplete?query=${query}`
  );
};

/*
========================================
✅ DISTANCE MATRIX
========================================
*/
export const getDistance = (origins, destinations) => {
  return HttpClient.get(
    `/location/distance?origins=${origins}&destinations=${destinations}`
  );
};

/*
========================================
✅ DIRECTIONS
========================================
*/
export const getDirections = (start, end) => {
  return HttpClient.get(
    `/location/directions?start=${start}&end=${end}`
  );
};

/*
========================================
✅ STATIC MAP
========================================
*/
export const getStaticMap = (lat, lng) => {
  return HttpClient.get(
    `/location/staticmap?lat=${lat}&lng=${lng}`
  );
};