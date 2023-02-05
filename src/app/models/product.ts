import { Bargain, Features, Like, OperationState, Order,
  Photo, Review, Shipping, User, Video } from ".";

export class Product {

  id?: string;
  name?: string;
  currentPrice?: number;
  fromPrice?: number;
  toPrice?: number;
  regular_price?: number;
  dateCreated?: Date;
  dateModified?: Date;
  about?: string;
  showOnPage?: boolean;
  salesCount?: number;
  stockCount?: number;
  viewCount?: number;


  cartItemId?: string;
  bidId?: string;
  storeId?: string;
  favouriteUsers?: User[];
  photos?: Photo[];
  videos?: Video[];
  productCategoryItems: ProductCategoryItem[];
  productModel?: ProductModel;
  features?: Features[];
  shippings?: Shipping[];
  reviews?: Review[];
  likes?: Like[];
  bargains?: Bargain[];


}

export class ProductReturn {
  id?: string;
  reason?: string;
  breachedSellerPolicy?: string;
  dateCreated?: Date;
  dateModified?: Date;
  status?: OperationState;

  userId?: string;
  order?: Order;
}

export class ProductModel {

  id?: string;
  serialNumber?: string;
  version?: string;
  dateReleased?: Date;
  firmware?: string;
  description?: string;


  productId?: string;
  productBrandId?: string;
  productBrand?: ProductBrand;
  product?: Product;
}


export class ProductCategory {

  id?: string;
  name?: string;
  description?: string;
  icon?: string;

  storeCategoryId?: string;
  productCategoryItems?: ProductCategoryItem[];
  photo?: Photo
}

export class ProductCategoryItem {

  id?: string;
  name?: string;
  icon?: string;
  features?: string[];

  productCategoryId?: string;
  productId?: string;
  products?: Product[];
  photo?: Photo

}



export class ProductBrand {
  id?: string
  manufacturer?: string
  location?: string
  photo?: Photo // logo

}

export class ProductToCategoryItemThrough{
  id?: string;
  productId?: string;
  productCategoryItemId?: string;
}


