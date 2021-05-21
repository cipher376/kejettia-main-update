/* tslint:disable */
import { Injectable } from '@angular/core';
import { Email } from '../../models/Email';
import { MyUser } from '../../models/MyUser';
import { Photo } from '../../models/Photo';
import { Store } from '../../models/Store';
import { StoreAddress } from '../../models/StoreAddress';
import { StoreManager } from '../../models/StoreManager';
import { Container } from '../../models/Container';
import { CartItem } from '../../models/CartItem';
import { Cart } from '../../models/Cart';
import { Coupon } from '../../models/Coupon';
import { Favourite } from '../../models/Favourite';
import { CouponUser } from '../../models/CouponUser';
import { Order } from '../../models/Order';
import { ProductCategory } from '../../models/ProductCategory';
import { ProductItem } from '../../models/ProductItem';
import { ProductCategoryItem } from '../../models/ProductCategoryItem';
import { DeliveryAddress } from '../../models/DeliveryAddress';
import { Brand } from '../../models/Brand';
import { Message } from '../../models/Message';
import { PaystackEvents } from '../../models/PaystackEvents';
import { Seller } from '../../models/Seller';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    Email: Email,
    MyUser: MyUser,
    Photo: Photo,
    Store: Store,
    StoreAddress: StoreAddress,
    StoreManager: StoreManager,
    Container: Container,
    CartItem: CartItem,
    Cart: Cart,
    Coupon: Coupon,
    Favourite: Favourite,
    CouponUser: CouponUser,
    Order: Order,
    ProductCategory: ProductCategory,
    ProductItem: ProductItem,
    ProductCategoryItem: ProductCategoryItem,
    DeliveryAddress: DeliveryAddress,
    Brand: Brand,
    Message: Message,
    PaystackEvents: PaystackEvents,
    Seller: Seller,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }

  public getAll(): Models {
    return this.models;
  }

  public getModelNames(): string[] {
    return Object.keys(this.models);
  }
}
