import { createSlice } from '@reduxjs/toolkit';

const initialState = { list: [] };

const itemSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.list.push(action.payload);
    },
    updateItem: (state, action) => {
      const { id, text } = action.payload;
      const itemIndex = state.list.findIndex(item => item.id === id);
      if (itemIndex !== -1) {
        state.list[itemIndex].text = text;
      }
    },
    deleteItem: (state, action) => {
      const id = action.payload;
      state.list = state.list.filter(item => item.id !== id);
    },
    loadStoredData: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { addItem, updateItem, deleteItem, loadStoredData } = itemSlice.actions;
export default itemSlice.reducer;