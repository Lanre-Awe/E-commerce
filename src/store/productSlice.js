import { createSlice } from "@reduxjs/toolkit";

const getProduct = () => {
  const product = localStorage.getItem("PRODUCT");
  if (product) {
    return JSON.parse([product]);
  } else {
    return [];
  }
};
const initialState = {
  product: getProduct(),
};
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    onView(state, action) {
      state.product = action.payload;
    },
  },
});

export const productAction = productSlice.actions;
export default productSlice;
