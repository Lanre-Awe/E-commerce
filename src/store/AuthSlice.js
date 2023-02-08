import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: "",
    loading: true,
  },
  reducers: {
    onNewUser(state, action) {
      state.currentUser = action.payload;
    },
    onLoading(state) {
      state.loading = false;
    },
  },
});

export const AuthAction = AuthSlice.actions;

export default AuthSlice;
