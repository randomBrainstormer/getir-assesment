import cartReducer, { addItemToCart, CartState } from './cartSlice';

describe('cart reducer', () => {
  const initialState: CartState = {
    items: [],
  };

  it('should handle initial state', () => {
    expect(cartReducer(undefined, { type: 'unknown' })).toEqual({
      items: [],
    });
  });

  it('should handle adding produitems to the cart', () => {
    const actual = cartReducer(
      initialState,
      addItemToCart({
        tags: ['Trees'],
        price: 10.99,
        name: 'Handcrafted Trees Mug',
        description:
          'enim corporis voluptatibus laudantium possimus alias dolorem voluptatem similique aut aliquam voluptatem voluptatem omnis id consequatur',
        slug: 'Handcrafted-Trees-Mug',
        added: 1485723766805,
        manufacturer: 'OHara-Group',
        itemType: 'mug',
      })
    );

    expect(actual.items[0].count).toEqual(1);
  });
});
