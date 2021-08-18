import { ORDER_STATE, PAYMENT_METHOD } from './enum';
import { CartItem, DeliveryAddress, OperationState, Store, User } from ".";

export class Order {

  id?: string;
  total?: number;
  dateCreated?: Date;
  dateModified?: Date;
  cartItems?: CartItem[];
  userId?: string;
  storeId?: string;

  store?: Store;
  user?: User;
  productReturnId?: string;
}

export class ConsolidatedOrder {
  id: string;
  state: ORDER_STATE;
  invoice?: string;
  grandTotal?: number;
  currency?: string;
  visibleToUser?: boolean;
  paymentMethod?: PAYMENT_METHOD

  dateCreated: Date;
  dateModified: Date;

  userId?: string;
  User?: User;
  orders?: Order[]
  deliveryAddress?: DeliveryAddress;
  deliveryAddressId?: string;

}
