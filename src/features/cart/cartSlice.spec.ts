import counterReducer, { CartState } from './cartSlice';

describe('counter reducer', () => {
  const initialState: CartState = {
    items: [],
  };

  it('should handle initial state', () => {
    expect(counterReducer(undefined, { type: 'unknown' })).toEqual({
      value: 0,
      status: 'idle',
    });
  });
});
