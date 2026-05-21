export const ENDPOINTS = {
  AUTH: {
    REGISTER: "/auth/register",
    LOGIN: "/auth/sellers/login",
    LOGOUT: "/auth/sellers/logout",
    PROFILE: "/auth/sellers/profile",
    VERIFY: "/auth/sellers/verify",
    DASHBOARD: "/auth/sellers/dashboard",
  },
  USER: {
    LOGIN: "/user/login",
    REGISTER: "/user/signup",
    GOOGLE_LOGIN: "/user/google-login",

    VERIFY: "/user/verify",
    PROFILE: "/user/profile",
    UPDATE_PROFILE: "/user/update-profile",
  },
  ADMIN: {
    LOGIN: "/auth/admin/login",
    GET_ALL_SELLERS: "/auth/admin/sellers",
    DELETE_SELLER: "/auth/admin/sellers",
  },

  CODE: {
    GENERATE: "/code/generate-code",
    VERIFY: "/code/verify-code",
    GENERATE_PRICE_POOL: "/code/generate-price-pool",
  },

  PRODUCTS: {
    CREATE: "/products/create",
    UPDATE: (id) => `/products/${id}`,
    DELETE: (id) => `/products/${id}`,
    GET_ALL: "/products",
    GET_ONE: (id) => `/products/${id}`,
    GET_SELLER_PRODUCTS: "/products/seller",
    LIMIT: "/products/limit",
    MY_PRODUCTS: "/products/my-products",
  },

  // 🆕 ADD THIS SECTION
  PRODUCT_STATS: {
    VIEW: "/product-stats/view",
  },
};