import { ProductSortFilter, ProductType } from '../../types';
import productReducer, {
  ProductsState,
  setActiveProducts,
} from './productsSlice';

describe('counter reducer', () => {
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

  it('should handle initial state', () => {
    expect(productReducer(undefined, { type: 'unknown' })).toEqual({
      products: [],
      isProductListLoading: false,
      productPages: 0,
      productType: ProductType.MUG,
      productFiltersSorting: ProductSortFilter.NONE,
      productFiltersBrands: [],
      productFiltersTags: [],
      activeFilterBrands: [],
      activeFiltersTags: [],
    });
  });

  it('should handle adding products to store', () => {
    const actual = productReducer(
      initialState,
      setActiveProducts({
        data: [
          {
            tags: ['Trees'],
            price: 10.99,
            name: 'Handcrafted Trees Mug',
            description:
              'enim corporis voluptatibus laudantium possimus alias dolorem voluptatem similique aut aliquam voluptatem voluptatem omnis id consequatur',
            slug: 'Handcrafted-Trees-Mug',
            added: 1485723766805,
            manufacturer: 'OHara-Group',
            itemType: 'mug',
          },
        ],
        count: 1,
      })
    );
    expect(actual.products[0].price).toEqual(10.99);
    expect(actual.productPages).toEqual(1);
  });
});
