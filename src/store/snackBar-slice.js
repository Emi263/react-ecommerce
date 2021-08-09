import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  message: null,
};

const snackbar = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    show: (state) => {
      state.isOpen = true;
    },
    hide: (state) => {
      state.isOpen = false;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
  },
});

export const { show, hide, setMessage } = snackbar.actions;
export default snackbar.reducer;
