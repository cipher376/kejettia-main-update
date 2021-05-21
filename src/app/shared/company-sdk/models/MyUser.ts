/* tslint:disable */

declare var Object: any;
export interface MyUserInterface {
  "id"?: any;
  "phone": string;
  "email": string;
  "realm"?: string;
  "username"?: string;
  "emailVerified"?: boolean;
  "dateCreated"?: Date;
  "dateModified"?: Date;
  "companyId"?: any;
  "companyWorkerId"?: any;
  "password"?: string;
  accessTokens?: any[];
  profiles?: any;
  companyManager?: any;
}

export class MyUser implements MyUserInterface {
  "id": any;
  "phone": string;
  "email": string;
  "realm": string;
  "username": string;
  "emailVerified": boolean;
  "dateCreated": Date;
  "dateModified": Date;
  "companyId": any;
  "companyWorkerId": any;
  "password": string;
  accessTokens: any[];
  profiles: any;
  companyManager: any;
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
        "email": {
          name: 'email',
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
        "companyId": {
          name: 'companyId',
          type: 'any'
        },
        "companyWorkerId": {
          name: 'companyWorkerId',
          type: 'any'
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
        profiles: {
          name: 'profiles',
          type: 'any',
          model: '',
          relationType: 'hasOne',
                  keyFrom: 'id',
          keyTo: 'myUserId'
        },
        companyManager: {
          name: 'companyManager',
          type: 'any',
          model: '',
          relationType: 'hasOne',
                  keyFrom: 'id',
          keyTo: 'myUserId'
        },
      }
    }
  }
}
