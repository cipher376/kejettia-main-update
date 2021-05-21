/* tslint:disable */

declare var Object: any;
export interface PhotoInterface {
  "id"?: any;
  "url": string;
  "type"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  "storeId"?: any;
  "productCategoryId"?: any;
  "productItemId"?: any;
  "messageId"?: any;
}

export class Photo implements PhotoInterface {
  "id": any;
  "url": string;
  "type": number;
  "createdAt": Date;
  "updatedAt": Date;
  "storeId": any;
  "productCategoryId": any;
  "productItemId": any;
  "messageId": any;
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
        "storeId": {
          name: 'storeId',
          type: 'any'
        },
        "productCategoryId": {
          name: 'productCategoryId',
          type: 'any'
        },
        "productItemId": {
          name: 'productItemId',
          type: 'any'
        },
        "messageId": {
          name: 'messageId',
          type: 'any'
        },
      },
      relations: {
      }
    }
  }
}
