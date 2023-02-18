import { Bargain, CartItem, Features, Like, OperationState, Order,
  Photo, Review, Shipping, User, Video } from ".";

export class Product {

  id?: string;
  name?: string;
  currentPrice?: number;
  fromPrice?: number;
  toPrice?: number;
  previousPrice?: number;
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
  productVariations: ProductVariation[];


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


export class ProductVariation {
  id: number; //	Unique identifier for the resource.READ-ONLY
  remoteId: any; //
  remoteProductId: any; //
  productId: any;
  // date_created: string; //	The date the variation was created, in the site's timezone.READ-ONLY
  // date_created_gmt: string; //	The date the variation was created, as GMT.READ-ONLY
  // date_modified: string; //	The date the variation was last modified, in the site's timezone.READ-ONLY
  // date_modified_gmt: string; //	The date the variation was last modified, as GMT.READ-ONLY
  // description: string; //	Variation description.
  // permalink: string; //	Variation URL.READ-ONLY
  // sku: string; //	Unique identifier.
  price: number; //	Current variation price.READ-ONLY
  regular_price: number; //	Variation regular price.
  // sale_price: string; //	Variation sale price.
  // date_on_sale_from: string; //	Start date of sale price, in the site's timezone.
  // date_on_sale_from_gmt: string; //	Start date of sale price, as GMT.
  // date_on_sale_to: string; //	End date of sale price, in the site's timezone.
  // date_on_sale_to_gmt: string; //	End date of sale price, as GMT.
  // on_sale: boolean; //	Shows if the variation is on sale.READ-ONLY
  // visible: boolean; //	Define if the attribute is visible on the "Additional information" tab in the product's page. Default is true.
  purchasable: boolean; //	Shows if the variation can be bought.READ-ONLY
  // virtual: boolean; //	If the variation is virtual. Default is false.
  // downloadable: boolean; //	If the variation is downloadable. Default is false.
  // downloads: WcFile[]; //	List of downloadable files. See Product variation - Downloads properties
  // download_limit: number; //	Number of times downloadable files can be downloaded after purchase. Default is -1.
  // download_expiry: number; //	Number of days until access to downloadable files expires. Default is -1.
  // tax_status: string; //	Tax status. Options: taxable, shipping and none. Default is taxable.
  // tax_class: string; //	Tax class.
  // manage_stock: boolean; //	Stock management at variation level. Default is false.
  stock_quantity: number; //	Stock quantity.
  in_stock: boolean; //	Controls whether or not the variation is listed as "in stock" or "out of stock" on the frontend. Default is true.
  // backorders: string; //	If managing stock, this controls if backorders are allowed. Options: no, notify and yes. Default is no.
  // backorders_allowed: boolean; //	Shows if backorders are allowed.READ-ONLY
  // backordered: boolean; //	Shows if the variation is on backordered.READ-ONLY
  // weight: string; //	Variation weight.
  // dimensions: WcDimension[]; //	Variation dimensions. See Product variation - Dimensions properties
  // shipping_class: string; //	Shipping class slug.
  // shipping_class_id: string; //	Shipping class ID.READ-ONLY
  // image: WcProductImage; //	Variation image data. See Product variation - Image properties
  attributes: VariationAttribute[]; //	List of attributes. See Product variation - Attributes properties
  // menu_order: number; //	Menu order, used to custom sort products.
  // meta_data: WcMetaData[]; //	Meta data. See Product variation - Meta data properties

  cartItems: CartItem[];
}

export class VariationAttribute {
  id: string; //	Attribute ID.
  name: string; //	Attribute name.
  option: string //	Selected attribute term name.
}
