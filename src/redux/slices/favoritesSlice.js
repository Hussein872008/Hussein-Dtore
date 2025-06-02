import { createSlice } from '@reduxjs/toolkit';

const loadFavoritesFromStorage = () => {
  try {
    const stored = localStorage.getItem('favorites');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    items: loadFavoritesFromStorage(),
  },
  reducers: {
    addFavorite: (state, action) => {
      const product = action.payload;
      if (!state.items.some(item => item.id === product.id)) {
        state.items.push(product);
      }
    },
    removeFavorite: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearFavorites: (state) => {
      state.items = [];
    },
  },
});

export const favoritesMiddleware = store => next => action => {
  const result = next(action);
  if (action.type?.startsWith('favorites/')) {
    localStorage.setItem('favorites', JSON.stringify(store.getState().favorites.items));
  }
  return result;
};

export const { addFavorite, removeFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;