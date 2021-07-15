import { Photo } from ".";

export class Coupon {

  id?: string;
  percentRate?: number;
  dateCreated?: Date;
  dateModified?: Date;
  expiryDate?: Date;
  uid?: string;


  storeId?: string;
  userId?: string;
  photo?: Photo;
}
