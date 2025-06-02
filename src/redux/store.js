import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../redux/slices/productsSlice';
import productDetailsReducer from '../redux/slices/productDetailsSlice';
import cartReducer from '../redux/slices/cartSlice';
import favoritesReducer from '../redux/slices/favoritesSlice';
import { favoritesMiddleware } from '../redux/slices/favoritesSlice';
import themeReducer from '../redux/slices/themeSlice';

// Middleware لحفظ السلة في localStorage
const cartMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  if (action.type?.startsWith('cart/')) {
    try {
      const cartState = store.getState().cart;
      localStorage.setItem('cart', JSON.stringify(cartState));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }
  return result;
};

// دالة لتحميل الحالة المبدئية من localStorage
const loadCartState = () => {
  try {
    const serializedState = localStorage.getItem('cart');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.error('Failed to load cart from localStorage', e);
    return undefined;
  }
};

export const store = configureStore({
  reducer: {
    products: productsReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    favorites: favoritesReducer,
    theme: themeReducer,
  },
  preloadedState: {
    cart: loadCartState() || { cartItems: [], totalPrice: 0 }
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cartMiddleware, favoritesMiddleware),
});