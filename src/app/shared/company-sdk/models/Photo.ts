/* tslint:disable */
import {
  CompanyService
} from '../index';

declare var Object: any;
export interface PhotoInterface {
  "id"?: any;
  "url": string;
  "type"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  "brandId"?: any;
  "companyId"?: any;
  "companyServiceId"?: any;
  "awardId"?: any;
  "bookingId"?: any;
  "projectId"?: any;
  companyService?: CompanyService;
}

export class Photo implements PhotoInterface {
  "id": any;
  "url": string;
  "type": number;
  "createdAt": Date;
  "updatedAt": Date;
  "brandId": any;
  "companyId": any;
  "companyServiceId": any;
  "awardId": any;
  "bookingId": any;
  "projectId": any;
  companyService: CompanyService;
  constructor(data?: PhotoInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Photo`.
   */
  public static getModelName() {
    return "Photo";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Photo for dynamic purposes.
  **/
  public static factory(data: PhotoInterface): Photo{
    return new Photo(data);
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
      name: 'Photo',
      plural: 'Photos',
      path: 'Photos',
      idName: 'id',
      properties: {
        "id": {
          name: 'id',
          type: 'any'
        },
        "url": {
          name: 'url',
          type: 'string'
        },
        "type": {
          name: 'type',
          type: 'number',
          default: 4
        },
        "createdAt": {
          name: 'createdAt',
          type: 'Date'
        },
        "updatedAt": {
          name: 'updatedAt',
          type: 'Date'
        },
        "brandId": {
          name: 'brandId',
          type: 'any'
        },
        "companyId": {
          name: 'companyId',
          type: 'any'
        },
        "companyServiceId": {
          name: 'companyServiceId',
          type: 'any'
        },
        "awardId": {
          name: 'awardId',
          type: 'any'
        },
        "bookingId": {
          name: 'bookingId',
          type: 'any'
        },
        "projectId": {
          name: 'projectId',
          type: 'any'
        },
      },
      relations: {
        companyService: {
          name: 'companyService',
          type: 'CompanyService',
          model: 'CompanyService',
          relationType: 'belongsTo',
                  keyFrom: 'companyServiceId',
          keyTo: 'id'
        },
      }
    }
  }
}
