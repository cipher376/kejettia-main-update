/* tslint:disable */
import {
  Store,
  GeoPoint
} from '../index';

declare var Object: any;
export interface StoreAddressInterface {
  "id"?: any;
  "street"?: string;
  "suburb"?: string;
  "city": string;
  "state": string;
  "country": string;
  "postcode": string;
  "appartment"?: string;
  "gmap"?: GeoPoint;
  "storeId"?: any;
  store?: Store;
}

export class StoreAddress implements StoreAddressInterface {
  "id": any;
  "street": string;
  "suburb": string;
  "city": string;
  "state": string;
  "country": string;
  "postcode": string;
  "appartment": string;
  "gmap": GeoPoint;
  "storeId": any;
  store: Store;
  constructor(data?: StoreAddressInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `StoreAddress`.
   */
  public static getModelName() {
    return "StoreAddress";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of StoreAddress for dynamic purposes.
  **/
  public static factory(data: StoreAddressInterface): StoreAddress{
    return new StoreAddress(data);
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
      name: 'StoreAddress',
      plural: 'StoreAddresses',
      path: 'StoreAddresses',
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
        "suburb": {
          name: 'suburb',
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
        "postcode": {
          name: 'postcode',
          type: 'string'
        },
        "appartment": {
          name: 'appartment',
          type: 'string'
        },
        "gmap": {
          name: 'gmap',
          type: 'GeoPoint'
        },
        "storeId": {
          name: 'storeId',
          type: 'any'
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
      }
    }
  }
}
