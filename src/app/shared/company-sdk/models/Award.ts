/* tslint:disable */
import {
  Photo
} from '../index';

declare var Object: any;
export interface AwardInterface {
  "id"?: any;
  "name": string;
  "issuerName": string;
  "dateReceived": Date;
  "companyId"?: any;
  "dateCreated"?: Date;
  "dateModified"?: Date;
  photos?: Photo[];
}

export class Award implements AwardInterface {
  "id": any;
  "name": string;
  "issuerName": string;
  "dateReceived": Date;
  "companyId": any;
  "dateCreated": Date;
  "dateModified": Date;
  photos: Photo[];
  constructor(data?: AwardInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Award`.
   */
  public static getModelName() {
    return "Award";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Award for dynamic purposes.
  **/
  public static factory(data: AwardInterface): Award{
    return new Award(data);
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
      name: 'Award',
      plural: 'Awards',
      path: 'Awards',
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
        "issuerName": {
          name: 'issuerName',
          type: 'string'
        },
        "dateReceived": {
          name: 'dateReceived',
          type: 'Date'
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
        photos: {
          name: 'photos',
          type: 'Photo[]',
          model: 'Photo',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'awardId'
        },
      }
    }
  }
}
