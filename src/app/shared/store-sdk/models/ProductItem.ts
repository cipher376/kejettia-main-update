/* tslint:disable */
import {
  Photo,
  MyUser,
  CartItem,
  ProductCategoryItem
} from '../index';

declare var Object: any;
export interface ProductItemInterface {
  "id"?: any;
  "name": string;
  "currentPrice": number;
  "prevPrice"?: number;
  "salesCount": number;
  "isGift"?: boolean;
  "isBulk"?: boolean;
  "about": string;
  "brand"?: string;
  "color"?: any;
  "bucket": string;
  "rackId": string;
  "expiredDate": Date;
  "viewCount"?: number;
  "stockCount": number;
  "dateCreated"?: Date;
  "dateModified"?: Date;
  photos?: Photo[];
  favouriteUsers?: MyUser[];
  cartItems?: CartItem[];
  productCategoryItems?: ProductCategoryItem[];
}

export class ProductItem implements ProductItemInterface {
  "id": any;
  "name": string;
  "currentPrice": number;
  "prevPrice": number;
  "salesCount": number;
  "isGift": boolean;
  "isBulk": boolean;
  "about": string;
  "brand": string;
  "color": any;
  "bucket": string;
  "rackId": string;
  "expiredDate": Date;
  "viewCount": number;
  "stockCount": number;
  "dateCreated": Date;
  "dateModified": Date;
  photos: Photo[];
  favouriteUsers: MyUser[];
  cartItems: CartItem[];
  productCategoryItems: ProductCategoryItem[];
  constructor(data?: ProductItemInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `ProductItem`.
   */
  public static getModelName() {
    return "ProductItem";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of ProductItem for dynamic purposes.
  **/
  public static factory(data: ProductItemInterface): ProductItem{
    return new ProductItem(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'ProductItem',
      plural: 'ProductItems',
      path: 'ProductItems',
      idName: 'id',
      properties: {
        "id": {
          name: 'id',
          type: 'any'
        },
        "name": {
          name: 'name',
          type: 'string'
        },
        "currentPrice": {
          name: 'currentPrice',
          type: 'number'
        },
        "prevPrice": {
          name: 'prevPrice',
          type: 'number'
        },
        "salesCount": {
          name: 'salesCount',
          type: 'number',
          default: 0
        },
        "isGift": {
          name: 'isGift',
          type: 'boolean'
        },
        "isBulk": {
          name: 'isBulk',
          type: 'boolean'
        },
        "about": {
          name: 'about',
          type: 'string'
        },
        "brand": {
          name: 'brand',
          type: 'string'
        },
        "color": {
          name: 'color',
          type: 'any'
        },
        "bucket": {
          name: 'bucket',
          type: 'string'
        },
        "rackId": {
          name: 'rackId',
          type: 'string'
        },
        "expiredDate": {
          name: 'expiredDate',
          type: 'Date'
        },
        "viewCount": {
          name: 'viewCount',
          type: 'number',
          default: 0
        },
        "stockCount": {
          name: 'stockCount',
          type: 'number',
          default: 0
        },
        "dateCreated": {
          name: 'dateCreated',
          type: 'Date'
        },
        "dateModified": {
          name: 'dateModified',
          type: 'Date'
        },
      },
      relations: {
        photos: {
          name: 'photos',
          type: 'Photo[]',
          model: 'Photo',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'productItemId'
        },
        favouriteUsers: {
          name: 'favouriteUsers',
          type: 'MyUser[]',
          model: 'MyUser',
          relationType: 'hasMany',
          modelThrough: 'Favourite',
          keyThrough: 'myUserId',
          keyFrom: 'id',
          keyTo: 'productItemId'
        },
        cartItems: {
          name: 'cartItems',
          type: 'CartItem[]',
          model: 'CartItem',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'productItemId'
        },
        productCategoryItems: {
          name: 'productCategoryItems',
          type: 'ProductCategoryItem[]',
          model: 'ProductCategoryItem',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'productItemId'
        },
      }
    }
  }
}
