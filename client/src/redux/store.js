import { configureStore } from '@reduxjs/toolkit';

import categoriesReducer from './slices/categoriesSlice';
import basketReduser from './slices/basketSlice';
export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    basket: basketReduser,
  },
});
