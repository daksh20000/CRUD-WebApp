import { configureStore } from '@reduxjs/toolkit';
import itemReducer from './items/itemSlice';

export const store = configureStore({
  reducer: {
    items: itemReducer,
  },
});