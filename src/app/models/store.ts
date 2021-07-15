import { User, Photo, Video, Address, Coupon, PolicyStatement, Product, Order, StoreCategory, Like, Review } from ".";

export class Store {

  id?: string;
  name?: string;
  dateCreated?: Date;
  dateModified?: Date;
  websiteUrl?: string;
  description?: string;
  activeHoursFrom?: string;
  activeHoursTo?: string;
  offerDelivery?: boolean;
  showOnPage?: boolean;

  policyStatements?: PolicyStatement[];
  coupons?: Coupon[];
  storeCategories?: StoreCategory[];
  products?: Product[];
  address?: Address;
  orders?: Order[];
  buyers?: User[];
  sellers?: User[];
  managers?: User[];
  favouriteUsers?: User[];
  photos?: Photo[];
  videos?: Video[];
  reviews?: Review[];
  likes?: Like[];

  createdById?: string;
}

export class StoreToCategoryThrough {
  id?: string;
  storeId?: string;
  storeCategoryId?: string;

}
