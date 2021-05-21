/* tslint:disable */
import {
  MyUser,
  Store
} from '../index';

declare var Object: any;
export interface SellerInterface {
  "id"?: any;
  "myUserId"?: any;
  myUser?: MyUser;
  stores?: Store[];
}

export class Seller implements SellerInterface {
  "id": any;
  "myUserId": any;
  myUser: MyUser;
  stores: Store[];
  constructor(data?: SellerInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Seller`.
   */
  public static getModelName() {
    return "Seller";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Seller for dynamic purposes.
  **/
  public static factory(data: SellerInterface): Seller{
    return new Seller(data);
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
      name: 'Seller',
      plural: 'Sellers',
      path: 'Sellers',
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
        stores: {
          name: 'stores',
          type: 'Store[]',
          model: 'Store',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'sellerId'
        },
      }
    }
  }
}
