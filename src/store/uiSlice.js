import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { notification: null, adding: false },
  reducers: {
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
    closeNotification(state) {
      state.notification = null;
    },
    onAdd(state) {
      state.adding = !state.adding;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
