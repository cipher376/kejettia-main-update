/* tslint:disable */

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
  storeManager?: any;
  carts?: any[];
  coupons?: any[];
  orders?: any[];
  favoriteItems?: any[];
  deliveryAddress?: any[];
  seller?: any;
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
  storeManager: any;
  carts: any[];
  coupons: any[];
  orders: any[];
  favoriteItems: any[];
  deliveryAddress: any[];
  seller: any;
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
        storeManager: {
          name: 'storeManager',
          type: 'any',
          model: '',
          relationType: 'hasOne',
                  keyFrom: 'id',
          keyTo: 'myUserId'
        },
        carts: {
          name: 'carts',
          type: 'any[]',
          model: '',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'myUserId'
        },
        coupons: {
          name: 'coupons',
          type: 'any[]',
          model: '',
          relationType: 'hasMany',
          modelThrough: 'CouponUser',
          keyThrough: 'couponId',
          keyFrom: 'id',
          keyTo: 'myUserId'
        },
        orders: {
          name: 'orders',
          type: 'any[]',
          model: '',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'myUserId'
        },
        favoriteItems: {
          name: 'favoriteItems',
          type: 'any[]',
          model: '',
          relationType: 'hasMany',
          modelThrough: 'Favourite',
          keyThrough: 'productItemId',
          keyFrom: 'id',
          keyTo: 'myUserId'
        },
        deliveryAddress: {
          name: 'deliveryAddress',
          type: 'any[]',
          model: '',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'myUserId'
        },
        seller: {
          name: 'seller',
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
