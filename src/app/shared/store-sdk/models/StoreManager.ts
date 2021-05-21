/* tslint:disable */
import {
  Store,
  MyUser
} from '../index';

declare var Object: any;
export interface StoreManagerInterface {
  "id"?: any;
  "myUserId"?: any;
  stores?: Store[];
  myUser?: MyUser;
}

export class StoreManager implements StoreManagerInterface {
  "id": any;
  "myUserId": any;
  stores: Store[];
  myUser: MyUser;
  constructor(data?: StoreManagerInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `StoreManager`.
   */
  public static getModelName() {
    return "StoreManager";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of StoreManager for dynamic purposes.
  **/
  public static factory(data: StoreManagerInterface): StoreManager{
    return new StoreManager(data);
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
      name: 'StoreManager',
      plural: 'StoreManagers',
      path: 'StoreManagers',
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
        stores: {
          name: 'stores',
          type: 'Store[]',
          model: 'Store',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'storeManagerId'
        },
        myUser: {
          name: 'myUser',
          type: 'MyUser',
          model: 'MyUser',
          relationType: 'belongsTo',
                  keyFrom: 'myUserId',
          keyTo: 'id'
        },
      }
    }
  }
}
