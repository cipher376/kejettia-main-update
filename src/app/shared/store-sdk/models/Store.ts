/* tslint:disable */
import {
  Photo,
  StoreAddress,
  StoreManager,
  Cart,
  Order,
  ProductCategory
} from '../index';

declare var Object: any;
export interface StoreInterface {
  "id"?: any;
  "name": string;
  "type"?: number;
  "totalSalesCount"?: number;
  "rate"?: number;
  "bucket": string;
  "url": string;
  "activeHourFrom"?: string;
  "activeHourTo"?: string;
  "dateCreated"?: Date;
  "dateModified"?: Date;
  "storeManagerId"?: any;
  "sellerId"?: any;
  photos?: Photo[];
  address?: StoreAddress;
  storeManager?: StoreManager;
  carts?: Cart[];
  orders?: Order[];
  productCategories?: ProductCategory[];
}

export class Store implements StoreInterface {
  "id": any;
  "name": string;
  "type": number;
  "totalSalesCount": number;
  "rate": number;
  "bucket": string;
  "url": string;
  "activeHourFrom": string;
  "activeHourTo": string;
  "dateCreated": Date;
  "dateModified": Date;
  "storeManagerId": any;
  "sellerId": any;
  photos: Photo[];
  address: StoreAddress;
  storeManager: StoreManager;
  carts: Cart[];
  orders: Order[];
  productCategories: ProductCategory[];
  constructor(data?: StoreInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Store`.
   */
  public static getModelName() {
    return "Store";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Store for dynamic purposes.
  **/
  public static factory(data: StoreInterface): Store{
    return new Store(data);
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
      name: 'Store',
      plural: 'Stores',
      path: 'Stores',
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
        "type": {
          name: 'type',
          type: 'number'
        },
        "totalSalesCount": {
          name: 'totalSalesCount',
          type: 'number'
        },
        "rate": {
          name: 'rate',
          type: 'number',
          default: 1
        },
        "bucket": {
          name: 'bucket',
          type: 'string'
        },
        "url": {
          name: 'url',
          type: 'string'
        },
        "activeHourFrom": {
          name: 'activeHourFrom',
          type: 'string'
        },
        "activeHourTo": {
          name: 'activeHourTo',
          type: 'string'
        },
        "dateCreated": {
          name: 'dateCreated',
          type: 'Date'
        },
        "dateModified": {
          name: 'dateModified',
          type: 'Date'
        },
        "storeManagerId": {
          name: 'storeManagerId',
          type: 'any'
        },
        "sellerId": {
          name: 'sellerId',
          type: 'any'
        },
      },
      relations: {
        photos: {
          name: 'photos',
          type: 'Photo[]',
          model: 'Photo',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'storeId'
        },
        address: {
          name: 'address',
          type: 'StoreAddress',
          model: 'StoreAddress',
          relationType: 'hasOne',
                  keyFrom: 'id',
          keyTo: 'storeId'
        },
        storeManager: {
          name: 'storeManager',
          type: 'StoreManager',
          model: 'StoreManager',
          relationType: 'belongsTo',
                  keyFrom: 'storeManagerId',
          keyTo: 'id'
        },
        carts: {
          name: 'carts',
          type: 'Cart[]',
          model: 'Cart',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'storeId'
        },
        orders: {
          name: 'orders',
          type: 'Order[]',
          model: 'Order',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'storeId'
        },
        productCategories: {
          name: 'productCategories',
          type: 'ProductCategory[]',
          model: 'ProductCategory',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'storeId'
        },
      }
    }
  }
}
