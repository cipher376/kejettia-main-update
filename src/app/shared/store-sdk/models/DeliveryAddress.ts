/* tslint:disable */
import {
  Order,
  MyUser,
  GeoPoint
} from '../index';

declare var Object: any;
export interface DeliveryAddressInterface {
  "id"?: any;
  "street"?: string;
  "apartment"?: string;
  "city": string;
  "state": string;
  "country": string;
  "phone"?: string;
  "email"?: string;
  "fname"?: string;
  "lname"?: string;
  "gmap"?: GeoPoint;
  "visibleToUser"?: boolean;
  "myUserId"?: any;
  orders?: Order[];
  owner?: MyUser;
}

export class DeliveryAddress implements DeliveryAddressInterface {
  "id": any;
  "street": string;
  "apartment": string;
  "city": string;
  "state": string;
  "country": string;
  "phone": string;
  "email": string;
  "fname": string;
  "lname": string;
  "gmap": GeoPoint;
  "visibleToUser": boolean;
  "myUserId": any;
  orders: Order[];
  owner: MyUser;
  constructor(data?: DeliveryAddressInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `DeliveryAddress`.
   */
  public static getModelName() {
    return "DeliveryAddress";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of DeliveryAddress for dynamic purposes.
  **/
  public static factory(data: DeliveryAddressInterface): DeliveryAddress{
    return new DeliveryAddress(data);
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
      name: 'DeliveryAddress',
      plural: 'DeliveryAddresses',
      path: 'DeliveryAddresses',
      idName: 'id',
      properties: {
        "id": {
          name: 'id',
          type: 'any'
        },
        "street": {
          name: 'street',
          type: 'string'
        },
        "apartment": {
          name: 'apartment',
          type: 'string'
        },
        "city": {
          name: 'city',
          type: 'string'
        },
        "state": {
          name: 'state',
          type: 'string'
        },
        "country": {
          name: 'country',
          type: 'string'
        },
        "phone": {
          name: 'phone',
          type: 'string'
        },
        "email": {
          name: 'email',
          type: 'string'
        },
        "fname": {
          name: 'fname',
          type: 'string'
        },
        "lname": {
          name: 'lname',
          type: 'string'
        },
        "gmap": {
          name: 'gmap',
          type: 'GeoPoint'
        },
        "visibleToUser": {
          name: 'visibleToUser',
          type: 'boolean'
        },
        "myUserId": {
          name: 'myUserId',
          type: 'any'
        },
      },
      relations: {
        orders: {
          name: 'orders',
          type: 'Order[]',
          model: 'Order',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'deliveryAddressId'
        },
        owner: {
          name: 'owner',
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
