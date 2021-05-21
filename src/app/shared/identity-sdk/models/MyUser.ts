/* tslint:disable */
import {
  Profile,
  FCMDevice,
  UserIdentity,
  UserCredential
} from '../index';

declare var Object: any;
export interface MyUserInterface {
  "id"?: any;
  "phone": string;
  "realm"?: string;
  "username"?: string;
  "email": string;
  "emailVerified"?: boolean;
  "dateCreated"?: Date;
  "dateModified"?: Date;
  "password"?: string;
  accessTokens?: any[];
  profile?: Profile;
  fcmDevices?: FCMDevice[];
  identities?: UserIdentity[];
  credentials?: UserCredential[];
}

export class MyUser implements MyUserInterface {
  "id": any;
  "phone": string;
  "realm": string;
  "username": string;
  "email": string;
  "emailVerified": boolean;
  "dateCreated": Date;
  "dateModified": Date;
  "password": string;
  accessTokens: any[];
  profile: Profile;
  fcmDevices: FCMDevice[];
  identities: UserIdentity[];
  credentials: UserCredential[];
  constructor(data?: MyUserInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `MyUser`.
   */
  public static getModelName() {
    return "MyUser";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of MyUser for dynamic purposes.
  **/
  public static factory(data: MyUserInterface): MyUser{
    return new MyUser(data);
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
      name: 'MyUser',
      plural: 'MyUsers',
      path: 'MyUsers',
      idName: 'id',
      properties: {
        "id": {
          name: 'id',
          type: 'any'
        },
        "phone": {
          name: 'phone',
          type: 'string'
        },
        "realm": {
          name: 'realm',
          type: 'string'
        },
        "username": {
          name: 'username',
          type: 'string'
        },
        "email": {
          name: 'email',
          type: 'string'
        },
        "emailVerified": {
          name: 'emailVerified',
          type: 'boolean'
        },
        "dateCreated": {
          name: 'dateCreated',
          type: 'Date'
        },
        "dateModified": {
          name: 'dateModified',
          type: 'Date'
        },
        "password": {
          name: 'password',
          type: 'string'
        },
      },
      relations: {
        accessTokens: {
          name: 'accessTokens',
          type: 'any[]',
          model: '',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'userId'
        },
        profile: {
          name: 'profile',
          type: 'Profile',
          model: 'Profile',
          relationType: 'hasOne',
                  keyFrom: 'id',
          keyTo: 'myUserId'
        },
        fcmDevices: {
          name: 'fcmDevices',
          type: 'FCMDevice[]',
          model: 'FCMDevice',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'myUserId'
        },
        identities: {
          name: 'identities',
          type: 'UserIdentity[]',
          model: 'UserIdentity',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'myUserId'
        },
        credentials: {
          name: 'credentials',
          type: 'UserCredential[]',
          model: 'UserCredential',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'myUserId'
        },
      }
    }
  }
}
