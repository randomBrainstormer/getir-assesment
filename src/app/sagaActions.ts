import { Action } from '@reduxjs/toolkit';
import { ProductSortFilter } from '../types';

export const sagaActions = {
  FETCH_PRODUCT_SAGA: 'FETCH_PRODUCT_SAGA',
  FETCH_OTHER_FILTERING_DATA: 'FETCH_OTHER_FILTERING_DATA',
  SET_SORTING_FILTER: 'SET_SORTING_FILTER',
  SET_ACTIVE_BRAND_FILTER: 'SET_ACTIVE_BRAND_FILTER',
  SET_ACTIVE_TAGS_FILTER: 'SET_ACTIVE_TAGS_FILTER',
};

export interface FetchProductAction extends Action {
  type: 'FETCH_PRODUCT_SAGA';
  payload: {
    page: number;
  };
}

export interface FetchCompanyAction extends Action {
  type: 'FETCH_OTHER_FILTERING_DATA';
}

export interface SortProductAction extends Action {
  type: 'SET_SORTING_FILTER';
  payload: {
    filter: ProductSortFilter;
  };
}

export interface SetActiveBrandFilter extends Action {
  type: 'SET_ACTIVE_BRAND_FILTER';
  payload: {
    value: boolean;
    label: string;
  };
}

export interface SetActiveTagFilter extends Action {
  type: 'SET_ACTIVE_TAGS_FILTER';
  payload: {
    value: boolean;
    label: string;
  };
}
