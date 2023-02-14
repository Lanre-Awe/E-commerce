import { createSlice } from "@reduxjs/toolkit";

const sideSlice = createSlice({
  name: "side",
  initialState: {
    showSide: false,
  },
  reducers: {
    control(state) {
      state.showSide = !state.showSide;
    },
  },
});
export const sideAction = sideSlice.actions;
export default sideSlice;
