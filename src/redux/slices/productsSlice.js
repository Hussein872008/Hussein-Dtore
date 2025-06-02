import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAllProducts = createAsyncThunk(
  'products/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch('https://dummyjson.com/products?limit=120&skip=10');
      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();
      return data.products || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchByCategory',
  async (category, { rejectWithValue }) => {
    try {
      const res = await fetch(`https://dummyjson.com/products/category/${category}`);
      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();
      return data.products || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  items: [],
  allProducts: [],
  status: 'idle',
  searchTerm: '',
  error: null,
  currentCategory: 'all',
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    clearSearchTerm(state) {
      state.searchTerm = '';
    },
    filterByCategory(state, action) {
      state.currentCategory = action.payload;
      if (action.payload === 'all') {
        state.items = state.allProducts;
      } else {
        state.items = state.allProducts.filter(
          product => product.category === action.payload
        );
      }
    },
    clearError(state) {
      state.error = null;
    },
    clearProducts(state) {
      state.items = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.allProducts = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.currentCategory = action.meta.arg;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});

export const { 
  setSearchTerm, 
  clearSearchTerm, 
  filterByCategory, 
  clearError, 
  clearProducts 
} = productsSlice.actions;

export const selectFilteredProducts = (state) => {
  const { items, searchTerm } = state.products;
  return items.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export default productsSlice.reducer;