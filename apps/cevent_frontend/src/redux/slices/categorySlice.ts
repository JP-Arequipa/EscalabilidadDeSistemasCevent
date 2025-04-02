import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EventCategory } from '@/utils/interfaces/Categories';
import axios from 'axios';

const initialState: EventCategory[] = [];

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    const response = await axios.get<EventCategory[]>('/api/categories');
    return response.data;
  },
);

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    selectAllCategories: (state) => {
      return state;
    },
    addCategory: (state, action: PayloadAction<EventCategory>) => {
      state.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchCategories.fulfilled,
      (state, action: PayloadAction<EventCategory[]>) => {
        return action.payload;
      },
    );
  },
});

export const { selectAllCategories, addCategory } = categorySlice.actions;
export default categorySlice.reducer;
