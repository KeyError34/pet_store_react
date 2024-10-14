import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    const categoriesRequests = [];

 
    for (let i = 1; i <= 8; i++) {
      categoriesRequests.push(axios.get(`http://localhost:3333/categories/${i}`)); 
    }

    const responses = await Promise.all(categoriesRequests);

    
    console.log('Responses:', responses);

    return responses.map(response => {
      const categoryData = response.data; 
      return categoryData 
      ;
    });
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [], 
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true; 
        state.error = null; 
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false; 
        state.categories = action.payload; 


        console.log('Fetched categories:', action.payload);
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false; 
        state.error = action.error.message; 
      });
  },
});


export default categoriesSlice.reducer;
