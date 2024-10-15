import { createSlice } from '@reduxjs/toolkit';

const saveToLocalStorage = state => {
  localStorage.setItem('basket', JSON.stringify(state));
};

const loadFromLocalStorage = () => {
  const storedBasket = localStorage.getItem('basket');
  return storedBasket
    ? JSON.parse(storedBasket)
    : {
        items: [],
        totalPrice: 0,
        totalDiscount: 0,
        totalQuantity: 0,
        discountApplied: false,
      };
};

const initialState = loadFromLocalStorage();

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find(i => i.id === item.id);

    
      const priceToAdd =
        item.discont_price !== null ? item.discont_price : item.price;

      if (existingItem) {
      
        existingItem.quantity += 1;
      } else {
       
        state.items.push({ ...item, quantity: 1 });
      }

      
      state.totalPrice += priceToAdd;
      state.totalQuantity += 1;

      saveToLocalStorage(state);
    },
    removeFromBasket: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find(i => i.id === id);

      if (existingItem) {
    
        const priceToRemove =
          existingItem.discont_price !== null
            ? existingItem.discont_price
            : existingItem.price;
        state.totalPrice -= priceToRemove * existingItem.quantity;
        state.totalQuantity -= existingItem.quantity;
        state.items = state.items.filter(item => item.id !== id);
        saveToLocalStorage(state);
      }
    },
    decrementQuantity: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find(i => i.id === id);

      if (existingItem) {
        
        const priceToRemove =
          existingItem.discont_price !== null
            ? existingItem.discont_price
            : existingItem.price;
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
          state.totalPrice -= priceToRemove;
          state.totalQuantity -= 1;
        } else {
          state.totalPrice -= priceToRemove;
          state.totalQuantity -= 1;
          state.items = state.items.filter(item => item.id !== id);
        }

        saveToLocalStorage(state);
      }
    },
    clearBasket: state => {
      state.items = [];
      state.totalPrice = 0;
      state.totalDiscount = 0;
      state.totalQuantity = 0;
      localStorage.removeItem('basket');
    },
    applyDiscount: state => {
      if (!state.discountApplied) {
        const discount = state.totalPrice * 0.05; 
        state.totalDiscount += discount;
        state.totalPrice -= discount;
        state.discountApplied = true;
      }
      saveToLocalStorage(state);
    },
  },
});


export const {
  addToBasket,
  removeFromBasket,
  decrementQuantity,
  clearBasket,
  applyDiscount,
} = basketSlice.actions;

export default basketSlice.reducer;