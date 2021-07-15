import { Product, Features } from ".";


export class CartItem {

  id?: string;
  quantity?: number;
  price?: number;
  product?: Product;
  features?: Features[];
  cartId?: string;

  orderId?: string;
}



export class Cart {

  id?: string;
  storeId?: string;
  userId?: string;
  cartItems?: CartItem[];
}
