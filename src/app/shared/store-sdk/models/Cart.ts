/* tslint:disable */
import {
  MyUser,
  CartItem,
  Store
} from '../index';

declare var Object: any;
export interface CartInterface {
  "id"?: any;
  "myUserId"?: any;
  "storeId"?: any;
  "dateCreated"?: Date;
  "dateModified"?: Date;
  user?: MyUser;
  items?: CartItem[];
  store?: Store;
  myUser?: MyUser;
}

export class Cart implements CartInterface {
  "id": any;
  "myUserId": any;
  "storeId": any;
  "dateCreated": Date;
  "dateModified": Date;
  user: MyUser;
  items: CartItem[];
  store: Store;
  myUser: MyUser;
  constructor(data?: CartInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Cart`.
   */
  public static getModelName() {
    return "Cart";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Cart for dynamic purposes.
  **/
  public static factory(data: CartInterface): Cart{
    return new Cart(data);
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
      name: 'Cart',
      plural: 'Carts',
      path: 'Carts',
      idName: 'id',
      properties: {
        "id": {
          name: 'id',
          type: 'any'
        },
        "myUserId": {
          name: 'myUserId',
          type: 'any'
        },
        "storeId": {
          name: 'storeId',
          type: 'any'
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
        user: {
          name: 'user',
          type: 'MyUser',
          model: 'MyUser',
          relationType: 'belongsTo',
                  keyFrom: 'myUserId',
          keyTo: 'id'
        },
        items: {
          name: 'items',
          type: 'CartItem[]',
          model: 'CartItem',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'cartId'
        },
        store: {
          name: 'store',
          type: 'Store',
          model: 'Store',
          relationType: 'belongsTo',
                  keyFrom: 'storeId',
          keyTo: 'id'
        },
        myUser: {
          name: 'myUser',
          type: 'MyUser',
          model: 'MyUser',
          relationType: 'belongsTo',
                  keyFrom: 'myUserId',
          keyTo: 'id'
        },
      }
    }
  }
}
