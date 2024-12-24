import { Product } from '../product';

export interface Cart {
  _id: string;
  userId: string;
  items: CartItem[];
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  productId: Product;
  quantity: number;
  _id: string;
}
