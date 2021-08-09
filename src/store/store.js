import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import productReducer from "./product-slice";
import snackbarReducer from "./snackBar-slice";

export const store = configureStore({
  //creates a react store
  reducer: {
    products: productReducer,
    snackbar: snackbarReducer,
  },
});
