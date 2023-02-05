import { Shipping } from './shipping';
import { Product, Features } from ".";
import { WcProduct } from './woocommerce.model';


export class CartItem {

  id?: string;
  quantity?: number;
  price?: number;
  product?: WcProduct;
  productId?: string;
  features?: Features[];
  shipping: Shipping;
  cartId?: string;
  shippingId?: string;
  orderId?: string;
}



export class Cart {

  id?: string;
  userId?: string;
  cartItems?: CartItem[];
}
