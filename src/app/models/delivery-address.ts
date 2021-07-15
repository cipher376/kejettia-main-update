import { Address } from ".";

export class DeliveryAddress {
  id?: string;
  fname?: string;
  mname?: string;
  lname?: string;
  email?: string;
  phone?: string;
  visibleToUser?: boolean;


  /**** Relational properties ****/
  userId?: string;
  orderId?: string;
  address?: Address;
}
