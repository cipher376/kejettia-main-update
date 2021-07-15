import { Bargain } from './bargain';
import { Address, Profile, Photo, Authentication, DeliveryAddress, ResetRequest, MyDevice, UserConfig, Store, ProductReturn, Coupon, Product, Cart, Employee } from ".";


export interface Token {
  token: '';
}

export class Credentials {
  id?: number;
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  otherName?: string;
  password?: string;
  realm?: string;
  remember?: boolean;
}


export class User {

  id?: string;
  bidderId?: string;
  email?: string;
  phone?: string;
  phoneVerified?: boolean;
  emailVerified?: boolean;
  roles?: string

  /*********** RELATIONAL PROPERTIES ***********/
  profile?: Profile;
  profilePhoto?: Photo;
  address?: Address;
  localAuthentication?: Authentication;
  externalAuthentication?: Authentication;
  currentDeliveryAddress?: DeliveryAddress;
  carts?: Cart[];


  resetPasswordRequest?: ResetRequest[];
  device?: MyDevice[];
  config?: UserConfig[];
  application?: string[];
  purchasedStores?: Store[];
  myStores?: Store[];
  myManagedStores?: Store[];
  otherDeliveryAddresses?: DeliveryAddress[];
  productReturns?: ProductReturn[];
  coupons?: Coupon[];
  favouriteStores?: Store[];
  favouriteProduct?: Product[];
  createdStores?: Store[];
  bargains?: Bargain[];

  employee?: Employee;

  constructor(data?: Partial<User>) {

  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
