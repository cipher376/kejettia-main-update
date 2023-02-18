import { Shipping } from './shipping';
import { Product, Features, ProductVariation } from ".";


export class CartItem {

  id?: string;
  quantity?: number;
  price?: number;
  product?: Product;
  productId?: string;
  features?: Features[];
  shipping: Shipping;
  cartId?: string;
  shippingId?: string;
  orderId?: string;
  productVariationId?: any;
  productVariation:ProductVariation;
}



export class Cart {

  id?: string;
  userId?: string;
  cartItems?: CartItem[];
}
