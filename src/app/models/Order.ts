import { ORDER_STATE, PAYMENT_METHOD } from './enum';
import { CartItem, DeliveryAddress, OperationState, Store, User } from ".";

export class Order {

  id?: string;
  remote?: any;
  total?: number;
  dateCreated?: Date;
  dateModified?: Date;
  cartItems?: CartItem[];
  userId?: string;
  storeId?: string;

  store?: Store;
  user?: User;
  productReturnId?: string;
  paymentUrl?: string
}

export class PaymentGateway{
  id?: string;
  remoteId: string;
  title: string;
  description?: string;
  order?: number;
  enabled?: boolean;
  method_title?: string;
  method_description?: string;
  settings?: object;
  storeId?: string;
  consolidatedOrders?: ConsolidatedOrder[];
}

export class ShippingMethod {
  id?: string;
  remoteId?: string;
  description?: string;
  title?: string;
  cost?: number;
  storeId: string;
  consolidatedOrders?: ConsolidatedOrder[];
  constructor(data?: Partial<ShippingMethod>) {
  }
}


export class ConsolidatedOrder {
  id: string;
  state: ORDER_STATE;
  invoice?: string;
  grandTotal?: number;
  taxValue?: number;
  currency?: string;
  visibleToUser?: boolean;
  paymentMethod?: PAYMENT_METHOD
  consolidatedPaymentUrl?: string;

  dateCreated: Date;
  dateModified: Date;

  userId?: string;
  User?: User;
  orders?: Order[]
  deliveryAddress?: DeliveryAddress;
  deliveryAddressId?: string;
  shippingMethod?: ShippingMethod;
  paymentGateway?: PaymentGateway;
  shippingMethodId?: string;
  paymentGatewayId?: string;

}
