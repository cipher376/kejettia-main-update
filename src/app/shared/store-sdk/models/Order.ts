/* tslint:disable */
import {
  MyUser,
  CartItem,
  Store,
  DeliveryAddress
} from '../index';

declare var Object: any;
export interface OrderInterface {
  "id"?: any;
  "invoiceId"?: string;
  "total": number;
  "currency": string;
  "state": number;
  "gatewayRes"?: string;
  "visibleToUser"?: boolean;
  "myUserId"?: any;
  "storeId"?: any;
  "dateCreated"?: Date;
  "dateModified"?: Date;
  "deliveryAddressId"?: any;
  owner?: MyUser;
  cartItems?: CartItem[];
  store?: Store;
  deliveryAddress?: DeliveryAddress;
}

export class Order implements OrderInterface {
  "id": any;
  "invoiceId": string;
  "total": number;
  "currency": string;
  "state": number;
  "gatewayRes": string;
  "visibleToUser": boolean;
  "myUserId": any;
  "storeId": any;
  "dateCreated": Date;
  "dateModified": Date;
  "deliveryAddressId": any;
  owner: MyUser;
  cartItems: CartItem[];
  store: Store;
  deliveryAddress: DeliveryAddress;
  constructor(data?: OrderInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Order`.
   */
  public static getModelName() {
    return "Order";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Order for dynamic purposes.
  **/
  public static factory(data: OrderInterface): Order{
    return new Order(data);
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
      name: 'Order',
      plural: 'Orders',
      path: 'Orders',
      idName: 'id',
      properties: {
        "id": {
          name: 'id',
          type: 'any'
        },
        "invoiceId": {
          name: 'invoiceId',
          type: 'string'
        },
        "total": {
          name: 'total',
          type: 'number'
        },
        "currency": {
          name: 'currency',
          type: 'string'
        },
        "state": {
          name: 'state',
          type: 'number'
        },
        "gatewayRes": {
          name: 'gatewayRes',
          type: 'string'
        },
        "visibleToUser": {
          name: 'visibleToUser',
          type: 'boolean',
          default: true
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
        "deliveryAddressId": {
          name: 'deliveryAddressId',
          type: 'any'
        },
      },
      relations: {
        owner: {
          name: 'owner',
          type: 'MyUser',
          model: 'MyUser',
          relationType: 'belongsTo',
                  keyFrom: 'myUserId',
          keyTo: 'id'
        },
        cartItems: {
          name: 'cartItems',
          type: 'CartItem[]',
          model: 'CartItem',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'orderId'
        },
        store: {
          name: 'store',
          type: 'Store',
          model: 'Store',
          relationType: 'belongsTo',
                  keyFrom: 'storeId',
          keyTo: 'id'
        },
        deliveryAddress: {
          name: 'deliveryAddress',
          type: 'DeliveryAddress',
          model: 'DeliveryAddress',
          relationType: 'belongsTo',
                  keyFrom: 'deliveryAddressId',
          keyTo: 'id'
        },
      }
    }
  }
}
