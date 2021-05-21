/* tslint:disable */
import {
  MyUser,
  ProductItem
} from '../index';

declare var Object: any;
export interface FavouriteInterface {
  "id"?: any;
  "myUserId"?: any;
  "productItemId"?: any;
  myUser?: MyUser;
  productItem?: ProductItem;
}

export class Favourite implements FavouriteInterface {
  "id": any;
  "myUserId": any;
  "productItemId": any;
  myUser: MyUser;
  productItem: ProductItem;
  constructor(data?: FavouriteInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Favourite`.
   */
  public static getModelName() {
    return "Favourite";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Favourite for dynamic purposes.
  **/
  public static factory(data: FavouriteInterface): Favourite{
    return new Favourite(data);
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
      name: 'Favourite',
      plural: 'Favourites',
      path: 'Favourites',
      idName: 'id',
      properties: {
        "id": {
          name: 'id',
          type: 'any'
        },
        "myUserId": {
          name: 'myUserId',
          type: 'any'
        },
        "productItemId": {
          name: 'productItemId',
          type: 'any'
        },
      },
      relations: {
        myUser: {
          name: 'myUser',
          type: 'MyUser',
          model: 'MyUser',
          relationType: 'belongsTo',
                  keyFrom: 'myUserId',
          keyTo: 'id'
        },
        productItem: {
          name: 'productItem',
          type: 'ProductItem',
          model: 'ProductItem',
          relationType: 'belongsTo',
                  keyFrom: 'productItemId',
          keyTo: 'id'
        },
      }
    }
  }
}
