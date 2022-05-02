import {
  getProductType,
  selectActiveBrandFilter,
  selectSortingFilter,
  setActiveBrandsFilter,
  setActiveProducts,
  setActiveTagsFilter,
  setOtherProductData,
  setProductIsLoading,
  setSortingFilter,
} from '../features/products/productsSlice';
import {
  FetchCompanyAction,
  FetchProductAction,
  sagaActions,
  SetActiveBrandFilter,
  SetActiveTagFilter,
  SortProductAction,
} from './sagaActions';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { Product, ProductSortFilter } from '../types';

const DEFAULT_PAGE_LIMIT = 16;

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

type ProductAPICall = {
  endpoint: string;
  page?: number;
  limit?: number;
  itemType?: 'mug' | 'shirt';
  productSorting?: ProductSortFilter;
  productBrands?: string[];
  tags?: string[];
};

type ProductAPIResponse<T> = { count: number | null; data: T[] };

const BASE_URL = 'http://localhost:3001';

// function to fetch product data
const callAPI = async <T>({
  endpoint,
  page,
  limit,
  itemType,
  productSorting,
  productBrands,
  tags,
}: ProductAPICall): Promise<ProductAPIResponse<T>> => {
  const url = new URL(endpoint, BASE_URL);

  if (limit) {
    url.searchParams.append('_limit', String(limit));
  }
  if (page) {
    url.searchParams.append('_page', String(page));
  }
  if (itemType) {
    url.searchParams.append('itemType', String(itemType));
  }

  if (productBrands && productBrands.length > 0) {
    productBrands.forEach((brand) => {
      url.searchParams.append('manufacturer', brand);
    });
  }

  if (tags && tags.length > 0) {
    tags.forEach((tag) => {
      url.searchParams.append('manufacturer', tag);
    });
  }

  if (productSorting !== ProductSortFilter.NONE) {
    switch (productSorting) {
      case ProductSortFilter.DATE_OLDEST:
        url.searchParams.append('_sort', 'added');
        url.searchParams.append('_order', 'asc');
        break;
      case ProductSortFilter.DATE_RECENT:
        url.searchParams.append('_sort', 'added');
        url.searchParams.append('_order', 'desc');
        break;
      case ProductSortFilter.PRICE_HIGHEST:
        url.searchParams.append('_sort', 'price');
        url.searchParams.append('_order', 'desc');
        break;
      case ProductSortFilter.PRICE_LOWEST:
        url.searchParams.append('_sort', 'price');
        url.searchParams.append('_order', 'asc');
        break;
    }
  }

  const response = await fetch(url.toString());

  const count =
    Number(response.headers.get('X-Total-Count')) / DEFAULT_PAGE_LIMIT;

  const data: any = await response.json();

  return { count, data: data as T[] };
};

// worker Saga for fetching products
export function* fetchProductSaga(action: FetchProductAction): any {
  yield put(setProductIsLoading(true));
  try {
    const itemType = yield select(getProductType);
    const productSorting = yield select(selectSortingFilter);
    const productBrands = yield select(selectActiveBrandFilter);
    const result = yield call(() =>
      callAPI<Product>({
        endpoint: 'items',
        page: action.payload?.page || 1,
        limit: DEFAULT_PAGE_LIMIT,
        itemType,
        productSorting,
        productBrands,
      })
    );

    yield put(setActiveProducts(result));

    yield delay(3000);
    yield put(setProductIsLoading(false));
  } catch (e) {
    console.log('ERR', e);
    yield put(setProductIsLoading(false));
    yield put({ type: 'NUMBER_SAGA_FAILED' });
  }
}

// worker Saga for updating sorting filters
export function* updateFiltersSaga(action: SortProductAction) {
  yield put(setSortingFilter(action.payload.filter));
  yield put({ type: sagaActions.FETCH_PRODUCT_SAGA });
}

export function* fetchOtherProductFilteringData(): any {
  try {
    const result = yield call(() =>
      callAPI<Product>({
        endpoint: 'items',
      })
    );

    const all_tags: string[] = [];
    const all_manufacturer: string[] = [];
    result.data.forEach((element: Product) => {
      const { tags, manufacturer } = element;

      tags.forEach((t) => {
        if (!all_tags.includes(t)) {
          all_tags.push(t);
        }
      });

      if (!all_manufacturer.includes(manufacturer)) {
        all_manufacturer.push(manufacturer);
      }
    });

    yield put(setOtherProductData({ all_tags, all_manufacturer }));
  } catch (e) {
    console.log('ERR', e);
    // yield put(setProductIsLoading(false));
    yield put({ type: 'OTHER_PRODUCT_SAGA_FAILED' });
  }
}

export function* updateActiveBrandFilter(action: SetActiveBrandFilter): any {
  yield put(setActiveBrandsFilter(action.payload));
  yield put({ type: sagaActions.FETCH_PRODUCT_SAGA });
}

export function* updateActiveTagFilter(action: SetActiveTagFilter): any {
  yield put(setActiveTagsFilter(action.payload));
  yield put({ type: sagaActions.FETCH_PRODUCT_SAGA });
}

// worker Saga for fetching companies
export default function* watcherSaga() {
  yield takeLatest<FetchProductAction>(
    sagaActions.FETCH_PRODUCT_SAGA,
    fetchProductSaga
  );
  yield takeLatest<SortProductAction>(
    sagaActions.SET_SORTING_FILTER,
    updateFiltersSaga
  );
  yield takeLatest<FetchCompanyAction>(
    sagaActions.FETCH_OTHER_FILTERING_DATA,
    fetchOtherProductFilteringData
  );
  yield takeLatest<SetActiveBrandFilter>(
    sagaActions.SET_ACTIVE_BRAND_FILTER,
    updateActiveBrandFilter
  );
  yield takeLatest<SetActiveTagFilter>(
    sagaActions.SET_ACTIVE_TAGS_FILTER,
    updateActiveTagFilter
  );
}
