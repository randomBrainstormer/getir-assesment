import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { CartItem } from '../../types';

export interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

export const productsSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const cartItem = {
        product: action.payload,
        id: action.payload.slug,
        count: 1,
      };

      const isItemPresentOnCart = state.items.findIndex(
        (itm) => itm.id === cartItem.id
      );

      if (isItemPresentOnCart === -1) {
        state.items.push(cartItem);
      } else {
        state.items[isItemPresentOnCart].count += 1;
      }
    },
    changeCartItemQuantity: (state, action) => {
      const { id, newValue } = action.payload;
      const itemToUpdate = state.items.findIndex((itm) => itm.id === id);

      if (newValue === 0) {
        // remove
        state.items.splice(itemToUpdate, 1);
      } else {
        state.items[itemToUpdate].count = newValue;
      }
    },
  },
});

export const { addItemToCart, changeCartItemQuantity } = productsSlice.actions;

export const selectCartProducts = (state: RootState) => state.cart.items;

export default productsSlice.reducer;
