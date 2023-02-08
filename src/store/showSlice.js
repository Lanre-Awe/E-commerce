import { createSlice } from "@reduxjs/toolkit";

const showSlice = createSlice({
  name: "show",
  initialState: { show: false },
  reducers: {
    onShow(state) {
      state.show = true;
    },
    onClose(state) {
      state.show = false;
    },
  },
});

export const showAction = showSlice.actions;
export default showSlice;
