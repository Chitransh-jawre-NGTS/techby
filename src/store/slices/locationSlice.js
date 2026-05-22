import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  reverseGeocode,
  searchLocation,
  autocompleteLocation,
} from "../../Api/locationApi";

/*
========================================
ASYNC THUNKS
========================================
*/

// Reverse geocode
export const fetchReverseGeocode = createAsyncThunk(
  "location/reverseGeocode",
  async ({ lat, lng }, thunkAPI) => {
    try {
      const res = await reverseGeocode(lat, lng);
      return res.data.location;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Error"
      );
    }
  }
);

// Search location
export const fetchSearchLocation = createAsyncThunk(
  "location/search",
  async (query, thunkAPI) => {
    try {
      const res = await searchLocation(query);
      return res.data.results;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Error"
      );
    }
  }
);

// Autocomplete
export const fetchAutocomplete = createAsyncThunk(
  "location/autocomplete",
  async (query, thunkAPI) => {
    try {
      const res = await autocompleteLocation(query);
      return res.data.results;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Error"
      );
    }
  }
);

/*
========================================
SLICE
========================================
*/
const locationSlice = createSlice({
  name: "location",
  initialState: {
    currentLocation: null,
    searchResults: [],
    autocompleteResults: [],
    loading: false,
    error: null,
  },

  reducers: {
    clearLocationState: (state) => {
      state.searchResults = [];
      state.autocompleteResults = [];
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // REVERSE GEOCODE
      .addCase(fetchReverseGeocode.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReverseGeocode.fulfilled, (state, action) => {
        state.loading = false;
        state.currentLocation = action.payload;
      })
      .addCase(fetchReverseGeocode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // SEARCH
      .addCase(fetchSearchLocation.fulfilled, (state, action) => {
        state.searchResults = action.payload;
      })

      // AUTOCOMPLETE
      .addCase(fetchAutocomplete.fulfilled, (state, action) => {
        state.autocompleteResults = action.payload;
      });
  },
});

export const { clearLocationState } = locationSlice.actions;

export default locationSlice.reducer; 



































