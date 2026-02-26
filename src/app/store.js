import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/addToCart/cartSlice";
import { productApi } from "./features/services/productApi";

const loadState = () => {
  try {
    const serialized = localStorage.getItem("cartState");
    if (serialized === null) return undefined;
    return { cart: JSON.parse(serialized) };
  } catch (e) {
    return e.message;
  }
};

const saveState = (state) => {
  try {
    const serialized = JSON.stringify(state.cart);
    localStorage.setItem("cartState", serialized);
  } catch (e) {
    return e.message;
  }
};

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  preloadedState: loadState(),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productApi.middleware)
});

store.subscribe(() => {
  saveState(store.getState());
});