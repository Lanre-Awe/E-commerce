import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: [],
};
const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    onShowCat(state, action) {
      state.category = action.payload;
    },
  },
});

export const categoryAction = categorySlice.actions;

export default categorySlice;
