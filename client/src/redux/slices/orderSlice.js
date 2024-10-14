import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const sendOrder = createAsyncThunk(
  'order/sendOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'http://localhost:3333/order/send',
        orderData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    order: null,
    loading: false,
    error: null,
    discount: 0, 
  },
  reducers: {
    clearOrder: state => {
      state.order = null;
      state.discount = 0; 
    },
  },
  extraReducers: builder => {
    builder
      .addCase(sendOrder.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;

        if (action.payload.discount) {
          state.discount = action.payload.discount;
        }
      })
      .addCase(sendOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearOrder } = orderSlice.actions; 

export default orderSlice.reducer;
