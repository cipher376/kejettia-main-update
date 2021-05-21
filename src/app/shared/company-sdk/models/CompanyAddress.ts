/* tslint:disable */
import {
  Company,
  GeoPoint
} from '../index';

declare var Object: any;
export interface CompanyAddressInterface {
  "id"?: any;
  "street"?: string;
  "suburb"?: string;
  "city": string;
  "state": string;
  "country": string;
  "postcode": string;
  "appartment"?: string;
  "gmap"?: GeoPoint;
  "companyId"?: any;
  company?: Company;
}

export class CompanyAddress implements CompanyAddressInterface {
  "id": any;
  "street": string;
  "suburb": string;
  "city": string;
  "state": string;
  "country": string;
  "postcode": string;
  "appartment": string;
  "gmap": GeoPoint;
  "companyId": any;
  company: Company;
  constructor(data?: CompanyAddressInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `CompanyAddress`.
   */
  public static getModelName() {
    return "CompanyAddress";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of CompanyAddress for dynamic purposes.
  **/
  public static factory(data: CompanyAddressInterface): CompanyAddress{
    return new CompanyAddress(data);
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
      name: 'CompanyAddress',
      plural: 'CompanyAddresses',
      path: 'CompanyAddresses',
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
        "companyId": {
          name: 'companyId',
          type: 'any'
        },
      },
      relations: {
        company: {
          name: 'company',
          type: 'Company',
          model: 'Company',
          relationType: 'belongsTo',
                  keyFrom: 'companyId',
          keyTo: 'id'
        },
      }
    }
  }
}
