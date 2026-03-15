import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginAdmin } from "../../Api/authApi";

export const adminLogin = createAsyncThunk(
  "admin/login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await loginAdmin(data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Admin login failed");
    }
  }
);

const adminSlice = createSlice({
  name: "admin",

  initialState: {
    admin: null,
    isAdminAuthenticated: false,
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(adminLogin.pending, (state) => {
        state.loading = true;
      })

      .addCase(adminLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload.admin;
        state.isAdminAuthenticated = true;

        if (action.payload.token) {
          const expiryTime = Date.now() + 5 * 60 * 60 * 1000;

          localStorage.setItem(
            "adminToken",
            JSON.stringify({
              token: action.payload.token,
              expiry: expiryTime,
            })
          );
        }
      })

      .addCase(adminLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminSlice.reducer;