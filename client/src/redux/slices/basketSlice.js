import { createSlice } from '@reduxjs/toolkit';


const saveToLocalStorage = state => {
  localStorage.setItem('basket', JSON.stringify(state));
};


const loadFromLocalStorage = () => {
  const storedBasket = localStorage.getItem('basket');
  return storedBasket ? JSON.parse(storedBasket) : undefined;
};

const initialState = loadFromLocalStorage() || {
  items: [],
  totalPrice: 0,
  totalDiscount: 0,
  totalQuantity: 0,
};

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find(i => i.id === item.id);

      if (existingItem) {
        existingItem.quantity += 1; 
      } else {
        state.items.push({ ...item, quantity: 1 });
      }

      state.totalPrice += item.price; 
      state.totalQuantity += 1; 
      if (item.discount_price) {
        state.totalDiscount += item.price - item.discount_price; 
      }

      saveToLocalStorage(state); 
    },
    removeFromBasket: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find(i => i.id === id);

      if (existingItem) {
        state.totalPrice -= existingItem.price * existingItem.quantity; 
        state.totalDiscount -= existingItem.discount_price
          ? existingItem.price - existingItem.discount_price
          : 0;
        state.totalQuantity -= existingItem.quantity; 

       
        state.items = state.items.filter(item => item.id !== id);
        saveToLocalStorage(state); 
      }
    },
    decrementQuantity: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find(i => i.id === id);

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1; 
          state.totalPrice -= existingItem.price; 
          state.totalQuantity -= 1; 
          saveToLocalStorage(state); 
        } else {
         
          state.totalPrice -= existingItem.price;
          state.totalQuantity -= 1;
          state.items = state.items.filter(item => item.id !== id);
          saveToLocalStorage(state); 
        }
      }
    },
    clearBasket: state => {
      state.items = [];
      state.totalPrice = 0;
      state.totalDiscount = 0;
      state.totalQuantity = 0; 

     
      localStorage.removeItem('basket');
    },
  },
});


export const { addToBasket, removeFromBasket, decrementQuantity, clearBasket } =
  basketSlice.actions;


export default basketSlice.reducer;
