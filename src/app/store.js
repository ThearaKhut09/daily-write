import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "./features/services/productApi";
import { auth } from "./features/auth/auth";

export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    [auth.reducerPath]: auth.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productApi.middleware, auth.middleware )
});
