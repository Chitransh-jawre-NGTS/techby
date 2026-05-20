import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import {
  getAllProducts,
  getSellerProducts,
  getProductById,
} from "../../Api/ProductApi";

// ======================================================
// FETCH ALL PRODUCTS
// ======================================================
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",

  async (_, { rejectWithValue }) => {
    try {
      const res = await getAllProducts();

      return res.data?.products || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch products"
      );
    }
  }
);

// ======================================================
// FETCH SELLER PRODUCTS
// ======================================================
export const fetchSellerProducts =
  createAsyncThunk(
    "products/fetchSellerProducts",

    async (_, { rejectWithValue }) => {
      try {
        const res =
          await getSellerProducts();

        return (
          res.data?.products || []
        );
      } catch (error) {
        return rejectWithValue(
          error.response?.data
            ?.message ||
            "Failed to fetch seller products"
        );
      }
    }
  );

// ======================================================
// FETCH PRODUCT BY ID
// ======================================================
export const fetchProductById =
  createAsyncThunk(
    "products/fetchProductById",

    async (
      productId,
      { rejectWithValue }
    ) => {
      try {
        const res =
          await getProductById(
            productId
          );

        return (
          res.data?.product || null
        );
      } catch (error) {
        return rejectWithValue(
          error.response?.data
            ?.message ||
            "Failed to fetch product"
        );
      }
    }
  );

// ======================================================
// INITIAL STATE
// ======================================================
const initialState = {
  // all products
  products: [],

  // seller products
  sellerProducts: [],

  // single product
  product: null,

  // loading
  loading: false,

  // error
  error: null,

  // cache timing
  lastFetched: null,
};

// ======================================================
// SLICE
// ======================================================
const productSlice = createSlice({
  name: "products",

  initialState,

  reducers: {
    // CLEAR PRODUCTS
    clearProducts: (state) => {
      state.products = [];
      state.sellerProducts = [];
      state.product = null;
      state.lastFetched = null;
      state.error = null;
    },

    // CLEAR SINGLE PRODUCT
    clearSingleProduct: (state) => {
      state.product = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ======================================================
      // FETCH ALL PRODUCTS
      // ======================================================
      .addCase(
        fetchProducts.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        fetchProducts.fulfilled,
        (state, action) => {
          state.loading = false;

          state.products =
            action.payload;

          state.lastFetched =
            Date.now();
        }
      )

      .addCase(
        fetchProducts.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload;
        }
      )

      // ======================================================
      // FETCH SELLER PRODUCTS
      // ======================================================
      .addCase(
        fetchSellerProducts.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        fetchSellerProducts.fulfilled,
        (state, action) => {
          state.loading = false;

          state.sellerProducts =
            action.payload;
        }
      )

      .addCase(
        fetchSellerProducts.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload;
        }
      )

      // ======================================================
      // FETCH PRODUCT BY ID
      // ======================================================
      .addCase(
        fetchProductById.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        fetchProductById.fulfilled,
        (state, action) => {
          state.loading = false;

          state.product =
            action.payload;
        }
      )

      .addCase(
        fetchProductById.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload;
        }
      );
  },
});

// ======================================================
// EXPORT ACTIONS
// ======================================================
export const {
  clearProducts,
  clearSingleProduct,
} = productSlice.actions;

// ======================================================
// EXPORT REDUCER
// ======================================================
export default productSlice.reducer;