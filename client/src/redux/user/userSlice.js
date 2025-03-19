import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  success: false,
  message: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInSuccess: (state, action) => {
      state.currentUser = action.payload.user;
      state.success = action.payload.success;
      state.message = action.payload.message;
    },
    signInFailure: (state, action) => {
      state.success = action.payload.success;
      state.message = action.payload.message;
    },
    signOut: (state) => {
      state.currentUser = null;
      state.success = true;
      state.message = null;
    },
  },
});

export const { signInSuccess, signInFailure, signOut } = userSlice.actions;

export default userSlice.reducer;
