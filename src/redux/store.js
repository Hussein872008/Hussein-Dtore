import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../redux/slices/productsSlice';
import productDetailsReducer from '../redux/slices/productDetailsSlice';
import cartReducer from '../redux/slices/cartSlice';
import favoritesReducer from '../redux/slices/favoritesSlice';
import { favoritesMiddleware } from '../redux/slices/favoritesSlice';
import themeReducer from '../redux/slices/themeSlice';


const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  if (action.type?.startsWith('cart/')) {
    console.log('Cart action detected, updating localStorage...');
    try {
      const cartState = store.getState().cart;
      localStorage.setItem('cart', JSON.stringify(cartState));
      console.log('LocalStorage updated successfully');
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }
  return result;
};

export const store = configureStore({
  reducer: {
    products: productsReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    favorites: favoritesReducer,
    theme: themeReducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware, favoritesMiddleware),
});