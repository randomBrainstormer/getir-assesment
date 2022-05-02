export type Product = {
  tags: string[];
  price: number;
  name: string;
  description: string;
  slug: string;
  added: number;
  manufacturer: string;
  itemType: ProductType;
};

export type CartItem = {
  product: Product;
  id: string;
  count: number;
};

// not use
export type Company = {
  slug: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  account: number;
  contact: string;
};

export enum ProductSortFilter {
  NONE,
  PRICE_LOWEST,
  PRICE_HIGHEST,
  DATE_RECENT,
  DATE_OLDEST,
}

export enum ProductType {
  MUG = 'mug',
  SHIRT = 'shirt',
}
