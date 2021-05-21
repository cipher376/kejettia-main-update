/* tslint:disable */
import {
  Store,
  Photo,
  ProductCategoryItem
} from '../index';

declare var Object: any;
export interface ProductCategoryInterface {
  "id"?: any;
  "name": string;
  "desc"?: string;
  "url"?: string;
  "type"?: string;
  "gender"?: string;
  "storeId"?: any;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  store?: Store;
  photo?: Photo;
  productCategoryItems?: ProductCategoryItem[];
}

export class ProductCategory implements ProductCategoryInterface {
  "id": any;
  "name": string;
  "desc": string;
  "url": string;
  "type": string;
  "gender": string;
  "storeId": any;
  "createdAt": Date;
  "updatedAt": Date;
  store: Store;
  photo: Photo;
  productCategoryItems: ProductCategoryItem[];
  constructor(data?: ProductCategoryInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `ProductCategory`.
   */
  public static getModelName() {
    return "ProductCategory";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of ProductCategory for dynamic purposes.
  **/
  public static factory(data: ProductCategoryInterface): ProductCategory{
    return new ProductCategory(data);
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
      name: 'ProductCategory',
      plural: 'ProductCategories',
      path: 'ProductCategories',
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
        "desc": {
          name: 'desc',
          type: 'string'
        },
        "url": {
          name: 'url',
          type: 'string'
        },
        "type": {
          name: 'type',
          type: 'string'
        },
        "gender": {
          name: 'gender',
          type: 'string'
        },
        "storeId": {
          name: 'storeId',
          type: 'any'
        },
        "createdAt": {
          name: 'createdAt',
          type: 'Date'
        },
        "updatedAt": {
          name: 'updatedAt',
          type: 'Date'
        },
      },
      relations: {
        store: {
          name: 'store',
          type: 'Store',
          model: 'Store',
          relationType: 'belongsTo',
                  keyFrom: 'storeId',
          keyTo: 'id'
        },
        photo: {
          name: 'photo',
          type: 'Photo',
          model: 'Photo',
          relationType: 'hasOne',
                  keyFrom: 'id',
          keyTo: 'productCategoryId'
        },
        productCategoryItems: {
          name: 'productCategoryItems',
          type: 'ProductCategoryItem[]',
          model: 'ProductCategoryItem',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'productCategoryId'
        },
      }
    }
  }
}
