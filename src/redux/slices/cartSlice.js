import { createSlice } from "@reduxjs/toolkit";

// الحالة المبدئية تحمّل من localStorage إذا كانت موجودة
const initialState = {
  cartItems: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
      cartSlice.caseReducers.calculateTotal(state);
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
      cartSlice.caseReducers.calculateTotal(state);
    },

    increaseQuantity: (state, action) => {
      const item = state.cartItems.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
        cartSlice.caseReducers.calculateTotal(state);
      }
    },

    decreaseQuantity: (state, action) => {
      const item = state.cartItems.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.cartItems = state.cartItems.filter((i) => i.id !== action.payload);
      }
      cartSlice.caseReducers.calculateTotal(state);
    },

    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.cartItems.find((item) => item.id === productId);
      if (item) {
        item.quantity = quantity;
        cartSlice.caseReducers.calculateTotal(state);
      }
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.totalPrice = 0;
    },

    calculateTotal: (state) => {
      state.totalPrice = state.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },

    // إضافة رد فعل لتحميل السلة من localStorage
    loadCartFromStorage: (state, action) => {
      return action.payload;
    }
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  updateQuantity,
  clearCart,
  calculateTotal,
  loadCartFromStorage,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.cartItems;
export const selectSubtotalPrice = (state) => state.cart.totalPrice;
export const selectTotalItems = (state) =>
  state.cart.cartItems.reduce((total, item) => total + item.quantity, 0);

export default cartSlice.reducer;