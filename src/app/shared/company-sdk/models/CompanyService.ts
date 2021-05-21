/* tslint:disable */
import {
  Photo
} from '../index';

declare var Object: any;
export interface CompanyServiceInterface {
  "id"?: any;
  "name": string;
  "description"?: string;
  "companyId"?: any;
  "dateCreated"?: Date;
  "dateModified"?: Date;
  photo?: Photo;
}

export class CompanyService implements CompanyServiceInterface {
  "id": any;
  "name": string;
  "description": string;
  "companyId": any;
  "dateCreated": Date;
  "dateModified": Date;
  photo: Photo;
  constructor(data?: CompanyServiceInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `CompanyService`.
   */
  public static getModelName() {
    return "CompanyService";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of CompanyService for dynamic purposes.
  **/
  public static factory(data: CompanyServiceInterface): CompanyService{
    return new CompanyService(data);
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
      name: 'CompanyService',
      plural: 'CompanyServices',
      path: 'CompanyServices',
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
        "description": {
          name: 'description',
          type: 'string'
        },
        "companyId": {
          name: 'companyId',
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
        photo: {
          name: 'photo',
          type: 'Photo',
          model: 'Photo',
          relationType: 'hasOne',
                  keyFrom: 'id',
          keyTo: 'companyServiceId'
        },
      }
    }
  }
}
