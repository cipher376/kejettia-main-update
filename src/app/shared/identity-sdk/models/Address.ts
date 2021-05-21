/* tslint:disable */
import {
  Profile,
  GeoPoint
} from '../index';

declare var Object: any;
export interface AddressInterface {
  "id"?: any;
  "street"?: string;
  "city": string;
  "state": string;
  "country": string;
  "postcode": string;
  "appartment"?: string;
  "gmap"?: GeoPoint;
  "profileId"?: any;
  profile?: Profile;
}

export class Address implements AddressInterface {
  "id": any;
  "street": string;
  "city": string;
  "state": string;
  "country": string;
  "postcode": string;
  "appartment": string;
  "gmap": GeoPoint;
  "profileId": any;
  profile: Profile;
  constructor(data?: AddressInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Address`.
   */
  public static getModelName() {
    return "Address";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Address for dynamic purposes.
  **/
  public static factory(data: AddressInterface): Address{
    return new Address(data);
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
      name: 'Address',
      plural: 'Addresses',
      path: 'Addresses',
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
        "profileId": {
          name: 'profileId',
          type: 'any'
        },
      },
      relations: {
        profile: {
          name: 'profile',
          type: 'Profile',
          model: 'Profile',
          relationType: 'belongsTo',
                  keyFrom: 'profileId',
          keyTo: 'id'
        },
      }
    }
  }
}
