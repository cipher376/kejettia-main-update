/* tslint:disable */

declare var Object: any;
export interface PhotoInterface {
  "id"?: any;
  "url": string;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  "profileId"?: any;
}

export class Photo implements PhotoInterface {
  "id": any;
  "url": string;
  "createdAt": Date;
  "updatedAt": Date;
  "profileId": any;
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
        "createdAt": {
          name: 'createdAt',
          type: 'Date'
        },
        "updatedAt": {
          name: 'updatedAt',
          type: 'Date'
        },
        "profileId": {
          name: 'profileId',
          type: 'any'
        },
      },
      relations: {
      }
    }
  }
}
