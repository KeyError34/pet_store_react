import { configureStore } from '@reduxjs/toolkit';

import categoriesReducer from './slices/categoriesSlice';
import basketReduser from './slices/basketSlice';
import orderReduser from './slices/orderSlice';
export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    basket: basketReduser,
    order: orderReduser,
  },
});
