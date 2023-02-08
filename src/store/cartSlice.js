import { createSlice } from "@reduxjs/toolkit";
const getCart = () => {
  const cart = localStorage.getItem("CART");
  if (cart) {
    return JSON.parse(cart);
  } else {
    console.log(cart);
  }
};

const initial = {
  items:
    getCart() && getCart().cartItem !== undefined ? getCart().cartItem : [],
  totalAmount:
    getCart() && getCart().quantity !== 0 && getCart().quantity !== undefined
      ? getCart().quantity
      : 0,
  totalPrice:
    getCart() &&
    getCart().totalPrice !== 0 &&
    getCart().totalPrice !== undefined
      ? getCart().totalPrice
      : 0,
  updating: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initial,
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    onAdd(state, action) {
      console.log(action);
      const existingItem = state.items.find(
        (item) => item.name === action.payload.name
      );
      state.totalAmount++;
      state.totalPrice = state.totalPrice + action.payload.price;
      if (!existingItem) {
        state.items.push({
          name: action.payload.name,
          quantity: 1,
          price: action.payload.price,
          id: action.payload.id,
          totalPrice: action.payload.price,
          img: action.payload.img,
          category: action.payload.category,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice =
          existingItem.totalPrice + action.payload.price;
      }
    },
    onRemove(state, action) {
      const existingItem = state.items.find(
        (item) => item.name === action.payload.name
      );
      state.totalAmount--;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter(
          (item) => item.name !== action.payload.name
        );
      } else {
        existingItem.quantity--;
      }
      state.totalPrice -= action.payload.price;
    },
    onUpdate(state) {
      state.updating = true;
    },
    onNotUpdate(state) {
      state.updating = false;
    },
    onQuantity(state, action) {
      state.totalAmount = action.payload;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
