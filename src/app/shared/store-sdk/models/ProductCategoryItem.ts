/* tslint:disable */
import {
  ProductCategory,
  ProductItem
} from '../index';

declare var Object: any;
export interface ProductCategoryItemInterface {
  "id"?: any;
  "productCategoryId"?: any;
  "productItemId"?: any;
  productCategory?: ProductCategory;
  productItem?: ProductItem;
}

export class ProductCategoryItem implements ProductCategoryItemInterface {
  "id": any;
  "productCategoryId": any;
  "productItemId": any;
  productCategory: ProductCategory;
  productItem: ProductItem;
  constructor(data?: ProductCategoryItemInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `ProductCategoryItem`.
   */
  public static getModelName() {
    return "ProductCategoryItem";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of ProductCategoryItem for dynamic purposes.
  **/
  public static factory(data: ProductCategoryItemInterface): ProductCategoryItem{
    return new ProductCategoryItem(data);
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
      name: 'ProductCategoryItem',
      plural: 'ProductCategoryItems',
      path: 'ProductCategoryItems',
      idName: 'id',
      properties: {
        "id": {
          name: 'id',
          type: 'any'
        },
        "productCategoryId": {
          name: 'productCategoryId',
          type: 'any'
        },
        "productItemId": {
          name: 'productItemId',
          type: 'any'
        },
      },
      relations: {
        productCategory: {
          name: 'productCategory',
          type: 'ProductCategory',
          model: 'ProductCategory',
          relationType: 'belongsTo',
                  keyFrom: 'productCategoryId',
          keyTo: 'id'
        },
        productItem: {
          name: 'productItem',
          type: 'ProductItem',
          model: 'ProductItem',
          relationType: 'belongsTo',
                  keyFrom: 'productItemId',
          keyTo: 'id'
        },
      }
    }
  }
}
