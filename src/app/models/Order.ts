import { ORDER_STATE } from './enum';
import { CartItem, DeliveryAddress, OperationState, Store, User } from ".";

export class Order {

  id?: string;
  invoiceId?: string;
  total?: number;
  currency?: string;
  state?: ORDER_STATE;
  visibleToUser?: boolean;
  dateCreated?: Date;
  dateModified?: Date;

  cartItems?: CartItem[];


  userId?: string;
  storeId?: string;

  store?: Store;
  user?: User;
  productReturnId?: string;
  deliveryAddress?: DeliveryAddress;

}
