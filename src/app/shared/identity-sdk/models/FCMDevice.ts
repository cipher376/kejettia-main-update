/* tslint:disable */
import {
  MyUser
} from '../index';

declare var Object: any;
export interface FCMDeviceInterface {
  "id"?: any;
  "token": string;
  "playerId"?: string;
  "platform": string;
  "uuid": string;
  "myUserId"?: any;
  myUser?: MyUser;
}

export class FCMDevice implements FCMDeviceInterface {
  "id": any;
  "token": string;
  "playerId": string;
  "platform": string;
  "uuid": string;
  "myUserId": any;
  myUser: MyUser;
  constructor(data?: FCMDeviceInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `FCMDevice`.
   */
  public static getModelName() {
    return "FCMDevice";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of FCMDevice for dynamic purposes.
  **/
  public static factory(data: FCMDeviceInterface): FCMDevice{
    return new FCMDevice(data);
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
      name: 'FCMDevice',
      plural: 'FCMDevices',
      path: 'FCMDevices',
      idName: 'id',
      properties: {
        "id": {
          name: 'id',
          type: 'any'
        },
        "token": {
          name: 'token',
          type: 'string'
        },
        "playerId": {
          name: 'playerId',
          type: 'string'
        },
        "platform": {
          name: 'platform',
          type: 'string'
        },
        "uuid": {
          name: 'uuid',
          type: 'string'
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
      }
    }
  }
}
