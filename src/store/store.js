import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import  adminReducer  from "./slices/adminSlice";
import locationReducer from "./slices/locationSlice";
import userReducer from "./slices/userSlice";
import productReducer from "./slices/productSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
      location: locationReducer,
        user: userReducer,
        products: productReducer,
  },
});