// src/redux/slices/userSlice.js

import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import {
  loginUserApi,
  registerUserApi,
  googleLoginApi,
  verifyUserApi,
  getUserProfileApi,
  updateUserProfileApi,
  logoutUserApi,
} from "../../Api/authApi";

// ======================================================
// LOGIN
// ======================================================

export const loginUser = createAsyncThunk(
  "user/loginUser",

  async (data, thunkAPI) => {
    try {
      const response =
        await loginUserApi(data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message
      );
    }
  }
);

// ======================================================
// REGISTER
// ======================================================

export const registerUser =
  createAsyncThunk(
    "user/registerUser",

    async (data, thunkAPI) => {
      try {
        const response =
          await registerUserApi(data);

        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            error.message
        );
      }
    }
  );

// ======================================================
// GOOGLE LOGIN
// ======================================================

export const googleLogin =
  createAsyncThunk(
    "user/googleLogin",

    async (data, thunkAPI) => {
      try {
        const response =
          await googleLoginApi(data);

        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            error.message
        );
      }
    }
  );

// ======================================================
// VERIFY USER
// ======================================================

export const verifyUser =
  createAsyncThunk(
    "user/verifyUser",

    async (_, thunkAPI) => {
      try {
        const response =
          await verifyUserApi();

        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            error.message
        );
      }
    }
  );

// ======================================================
// GET USER PROFILE
// ======================================================

export const getUserProfile =
  createAsyncThunk(
    "user/getUserProfile",

    async (_, thunkAPI) => {
      try {
        const response =
          await getUserProfileApi();

        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            error.message
        );
      }
    }
  );

// ======================================================
// UPDATE USER PROFILE
// ======================================================

export const updateUserProfile =
  createAsyncThunk(
    "user/updateUserProfile",

    async (data, thunkAPI) => {
      try {
        const response =
          await updateUserProfileApi(data);

        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            error.message
        );
      }
    }
  );

// ======================================================
// SLICE
// ======================================================

const userSlice = createSlice({
  name: "user",

  initialState: {
    // USER ONLY IN REDUX
    user: null,

    // TOKEN IN LOCAL STORAGE
    token:
      localStorage.getItem("token") ||
      null,

    loading: false,

    error: null,
  },

  reducers: {
    // ======================================================
    // LOGOUT
    // ======================================================

    logoutUser: (state) => {
      state.user = null;

      state.token = null;

      state.error = null;

      // REMOVE TOKEN
      localStorage.removeItem("token");

      logoutUserApi();
    },
  },

  extraReducers: (builder) => {
    builder

      // ======================================================
      // LOGIN
      // ======================================================

      .addCase(
        loginUser.pending,
        (state) => {
          state.loading = true;

          state.error = null;
        }
      )

      .addCase(
        loginUser.fulfilled,
        (state, action) => {
          state.loading = false;

          state.user =
            action.payload.user;

          state.token =
            action.payload.token;

          // STORE ONLY TOKEN
          localStorage.setItem(
            "token",
            action.payload.token
          );
        }
      )

      .addCase(
        loginUser.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload;
        }
      )

      // ======================================================
      // REGISTER
      // ======================================================

      .addCase(
        registerUser.pending,
        (state) => {
          state.loading = true;

          state.error = null;
        }
      )

      .addCase(
        registerUser.fulfilled,
        (state, action) => {
          state.loading = false;

          state.user =
            action.payload.user;

          state.token =
            action.payload.token;

          // STORE ONLY TOKEN
          localStorage.setItem(
            "token",
            action.payload.token
          );
        }
      )

      .addCase(
        registerUser.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload;
        }
      )

      // ======================================================
      // GOOGLE LOGIN
      // ======================================================

      .addCase(
        googleLogin.pending,
        (state) => {
          state.loading = true;

          state.error = null;
        }
      )

      .addCase(
        googleLogin.fulfilled,
        (state, action) => {
          state.loading = false;

          state.user =
            action.payload.user;

          state.token =
            action.payload.token;

          // STORE ONLY TOKEN
          localStorage.setItem(
            "token",
            action.payload.token
          );
        }
      )

      .addCase(
        googleLogin.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload;
        }
      )

      // ======================================================
      // VERIFY USER
      // ======================================================

      .addCase(
        verifyUser.pending,
        (state) => {
          state.loading = true;
        }
      )

      .addCase(
        verifyUser.fulfilled,
        (state, action) => {
          state.loading = false;

          state.user =
            action.payload.user;
        }
      )

      .addCase(
        verifyUser.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload;
        }
      )

      // ======================================================
      // GET USER PROFILE
      // ======================================================

      .addCase(
        getUserProfile.pending,
        (state) => {
          state.loading = true;
        }
      )

      .addCase(
        getUserProfile.fulfilled,
        (state, action) => {
          state.loading = false;

          state.user =
            action.payload.user;
        }
      )

      .addCase(
        getUserProfile.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload;
        }
      )

      // ======================================================
      // UPDATE PROFILE
      // ======================================================

      .addCase(
        updateUserProfile.pending,
        (state) => {
          state.loading = true;
        }
      )

      .addCase(
        updateUserProfile.fulfilled,
        (state, action) => {
          state.loading = false;

          state.user =
            action.payload.user;
        }
      )

      .addCase(
        updateUserProfile.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload;
        }
      );
  },
});

export const { logoutUser } =
  userSlice.actions;

export default userSlice.reducer;