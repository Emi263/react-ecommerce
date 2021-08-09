import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  numberOfItems: JSON.parse(localStorage.getItem("numOfItems")) || 0,
  items: JSON.parse(localStorage.getItem("prodInCart")) || [],
  total: JSON.parse(localStorage.getItem("total")) || 0,
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const alreadyExists = state.items.some(
        (item) => item.id === action.payload.id
      );
      if (alreadyExists) {
        return;
      } else {
        state.total = state.total + action.payload.price * 1;
        state.numberOfItems++;
        state.items.push(action.payload);
      }
    },
    increaseQuantity: (state, action) => {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload
      );
      state.items[itemIndex].quantity++;
      state.numberOfItems++;
      state.total += state.items[itemIndex].price;
    },
    decreaseQuantity: (state, action) => {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload
      );
      if (state.items[itemIndex].quantity == 1) {
        state.total -= state.items[itemIndex].price;
        state.items = state.items.filter((item) => item.id != action.payload);
        state.numberOfItems--;
      } else {
        state.items[itemIndex].quantity--;
        state.numberOfItems--;
        state.total -= state.items[itemIndex].price;
      }
    },
    //empty the cart
    emptyCart: (state) => {
      state.items = [];
      state.numberOfItems = 0;
      state.total = 0;
    },
    //remove a product
    removeProduct: (state, action) => {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload
      );
      state.numberOfItems -= state.items[itemIndex].quantity;
      state.total -=
        state.items[itemIndex].quantity * state.items[itemIndex].price;
      state.items = state.items.filter((item) => item.id != action.payload); //filter THE ITEMS AFTER UPDATING QUANTITY AND PRICE
    },
  },
});

export const {
  removeProduct,
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  emptyCart,
} = productSlice.actions;
export default productSlice.reducer;
