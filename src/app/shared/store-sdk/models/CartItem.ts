/* tslint:disable */
import {
  Cart,
  Order,
  ProductItem
} from '../index';

declare var Object: any;
export interface CartItemInterface {
  "id"?: any;
  "quantity": number;
  "price": number;
  "dateCreated"?: Date;
  "dateModified"?: Date;
  "cartId"?: any;
  "orderId"?: any;
  "productItemId"?: any;
  cart?: Cart;
  order?: Order;
  productItem?: ProductItem;
}

export class CartItem implements CartItemInterface {
  "id": any;
  "quantity": number;
  "price": number;
  "dateCreated": Date;
  "dateModified": Date;
  "cartId": any;
  "orderId": any;
  "productItemId": any;
  cart: Cart;
  order: Order;
  productItem: ProductItem;
  constructor(data?: CartItemInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `CartItem`.
   */
  public static getModelName() {
    return "CartItem";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of CartItem for dynamic purposes.
  **/
  public static factory(data: CartItemInterface): CartItem{
    return new CartItem(data);
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
      name: 'CartItem',
      plural: 'CartItems',
      path: 'CartItems',
      idName: 'id',
      properties: {
        "id": {
          name: 'id',
          type: 'any'
        },
        "quantity": {
          name: 'quantity',
          type: 'number'
        },
        "price": {
          name: 'price',
          type: 'number'
        },
        "dateCreated": {
          name: 'dateCreated',
          type: 'Date'
        },
        "dateModified": {
          name: 'dateModified',
          type: 'Date'
        },
        "cartId": {
          name: 'cartId',
          type: 'any'
        },
        "orderId": {
          name: 'orderId',
          type: 'any'
        },
        "productItemId": {
          name: 'productItemId',
          type: 'any'
        },
      },
      relations: {
        cart: {
          name: 'cart',
          type: 'Cart',
          model: 'Cart',
          relationType: 'belongsTo',
                  keyFrom: 'cartId',
          keyTo: 'id'
        },
        order: {
          name: 'order',
          type: 'Order',
          model: 'Order',
          relationType: 'belongsTo',
                  keyFrom: 'orderId',
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
