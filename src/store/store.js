import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import cartSlice from "./cartSlice";
import categorySlice from "./categorySlice";
import productSlice from "./productSlice";
import showSlice from "./showSlice";
import sideSlice from "./sideSlice";
import uiSlice from "./uiSlice";

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    ui: uiSlice.reducer,
    category: categorySlice.reducer,
    product: productSlice.reducer,
    show: showSlice.reducer,
    auth: AuthSlice.reducer,
    showSide: sideSlice.reducer,
  },
});

export default store;
