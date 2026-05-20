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

// ================= LOGIN =================
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

// ================= REGISTER =================
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

// ================= GOOGLE LOGIN =================
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

// ================= VERIFY USER =================
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

// ================= GET PROFILE =================
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

// ================= UPDATE PROFILE =================
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

const userSlice = createSlice({
  name: "user",

  initialState: {
    user:
      JSON.parse(
        localStorage.getItem("user")
      ) || null,

    token:
      localStorage.getItem("token") ||
      null,

    loading: false,

    error: null,
  },

  reducers: {

    // ================= LOGOUT =================
    logoutUser: (state) => {

      state.user = null;
      state.token = null;
      state.error = null;

      logoutUserApi();
    },
  },

  extraReducers: (builder) => {

    builder

      // ================= LOGIN =================
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

          localStorage.setItem(
            "token",
            action.payload.token
          );

          localStorage.setItem(
            "user",
            JSON.stringify(
              action.payload.user
            )
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

      // ================= REGISTER =================
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

          localStorage.setItem(
            "token",
            action.payload.token
          );

          localStorage.setItem(
            "user",
            JSON.stringify(
              action.payload.user
            )
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

      // ================= GOOGLE LOGIN =================
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

          localStorage.setItem(
            "token",
            action.payload.token
          );

          localStorage.setItem(
            "user",
            JSON.stringify(
              action.payload.user
            )
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

      // ================= VERIFY USER =================
      .addCase(
        verifyUser.fulfilled,
        (state, action) => {

          state.user =
            action.payload.user;
        }
      )

      // ================= GET PROFILE =================
      .addCase(
        getUserProfile.fulfilled,
        (state, action) => {

          state.user =
            action.payload.user;
        }
      )

      // ================= UPDATE PROFILE =================
      .addCase(
        updateUserProfile.fulfilled,
        (state, action) => {

          state.user =
            action.payload.user;

          localStorage.setItem(
            "user",
            JSON.stringify(
              action.payload.user
            )
          );
        }
      );
  },
});

export const { logoutUser } =
  userSlice.actions;

export default userSlice.reducer;