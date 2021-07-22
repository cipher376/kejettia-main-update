import { Product, Features } from ".";


export class CartItem {

  id?: string;
  quantity?: number;
  price?: number;
  product?: Product;
  productId?: string;
  features?: Features[];
  cartId?: string;

  orderId?: string;
}



export class Cart {

  id?: string;
  userId?: string;
  cartItems?: CartItem[];
}
