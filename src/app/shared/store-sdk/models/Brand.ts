/* tslint:disable */

declare var Object: any;
export interface BrandInterface {
  "id"?: any;
  "url": string;
  "icon"?: string;
  "name"?: string;
  "createdAt"?: Date;
  "updatedAt"?: Date;
}

export class Brand implements BrandInterface {
  "id": any;
  "url": string;
  "icon": string;
  "name": string;
  "createdAt": Date;
  "updatedAt": Date;
  constructor(data?: BrandInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Brand`.
   */
  public static getModelName() {
    return "Brand";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Brand for dynamic purposes.
  **/
  public static factory(data: BrandInterface): Brand{
    return new Brand(data);
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
      name: 'Brand',
      plural: 'Brands',
      path: 'Brands',
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
        "icon": {
          name: 'icon',
          type: 'string'
        },
        "name": {
          name: 'name',
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
      },
      relations: {
      }
    }
  }
}
