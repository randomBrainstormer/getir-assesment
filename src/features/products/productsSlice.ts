import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Product, ProductSortFilter, ProductType } from '../../types';

export interface ProductsState {
  products: Product[];
  isProductListLoading: boolean;
  productPages: number;
  productType: ProductType;
  productFiltersSorting: ProductSortFilter;
  productFiltersBrands: string[];
  productFiltersTags: string[];
  activeFilterBrands: string[];
  activeFiltersTags: string[];
}

const initialState: ProductsState = {
  products: [],
  isProductListLoading: false,
  productPages: 0,
  productType: ProductType.MUG,
  productFiltersSorting: ProductSortFilter.NONE,
  productFiltersBrands: [],
  productFiltersTags: [],
  activeFilterBrands: [],
  activeFiltersTags: [],
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setActiveProducts: (state, action) => {
      state.products = action.payload.data;
      state.productPages = Math.ceil(action.payload.count);
    },
    setProductIsLoading: (state, action) => {
      state.isProductListLoading = action.payload;
    },
    setActiveProductType: (state, action) => {
      state.productType = action.payload;
    },
    setSortingFilter: (state, action) => {
      state.productFiltersSorting = Number(action.payload);
    },
    setOtherProductData: (state, action) => {
      const { all_manufacturer, all_tags } = action.payload;
      state.productFiltersBrands = all_manufacturer;
      state.productFiltersTags = all_tags;
    },
    setActiveBrandsFilter: (state, action) => {
      const { label, value } = action.payload;
      if (value && !state.activeFilterBrands.includes(label)) {
        state.activeFilterBrands.push(label);
      } else if (!value && state.activeFilterBrands.includes(label)) {
        const indx = state.activeFilterBrands.indexOf(label);
        state.activeFilterBrands.splice(indx, 1);
      }
    },
    setActiveTagsFilter: (state, action) => {
      const { label, value } = action.payload;
      if (value && !state.activeFiltersTags.includes(label)) {
        state.activeFiltersTags.push(label);
      } else if (!value && state.activeFiltersTags.includes(label)) {
        const indx = state.activeFiltersTags.indexOf(label);
        state.activeFiltersTags.splice(indx, 1);
      }
    },
  },
});

export const {
  setActiveProducts,
  setProductIsLoading,
  setActiveProductType,
  setSortingFilter,
  setOtherProductData,
  setActiveBrandsFilter,
  setActiveTagsFilter,
} = productsSlice.actions;

// selectors

export const selectProducts = (state: RootState) => state.products.products;

export const selectSortingFilter = (state: RootState) =>
  state.products.productFiltersSorting;

export const isProductListLoading = (state: RootState) =>
  state.products.isProductListLoading;

export const productPages = (state: RootState) => state.products.productPages;

export const getProductType = (state: RootState) => {
  return state.products.productType;
};

export const selectActiveBrandFilter = (state: RootState) =>
  state.products.activeFilterBrands;

export const selectActiveTagFilter = (state: RootState) =>
  state.products.activeFiltersTags;

export const selectFilterBrands = (state: RootState) =>
  state.products.productFiltersBrands;

export const selectFilterTags = (state: RootState) =>
  state.products.productFiltersTags;

export default productsSlice.reducer;
