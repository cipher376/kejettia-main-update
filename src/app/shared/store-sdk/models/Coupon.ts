/* tslint:disable */
import {
  MyUser
} from '../index';

declare var Object: any;
export interface CouponInterface {
  "id"?: any;
  "expiredDate": Date;
  "uid": string;
  "price": number;
  "dateCreated"?: Date;
  "dateModified"?: Date;
  users?: MyUser[];
}

export class Coupon implements CouponInterface {
  "id": any;
  "expiredDate": Date;
  "uid": string;
  "price": number;
  "dateCreated": Date;
  "dateModified": Date;
  users: MyUser[];
  constructor(data?: CouponInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Coupon`.
   */
  public static getModelName() {
    return "Coupon";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Coupon for dynamic purposes.
  **/
  public static factory(data: CouponInterface): Coupon{
    return new Coupon(data);
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
      name: 'Coupon',
      plural: 'Coupons',
      path: 'Coupons',
      idName: 'id',
      properties: {
        "id": {
          name: 'id',
          type: 'any'
        },
        "expiredDate": {
          name: 'expiredDate',
          type: 'Date'
        },
        "uid": {
          name: 'uid',
          type: 'string'
        },
        "price": {
          name: 'price',
          type: 'number'
        },
        "dateCreated": {
          name: 'dateCreated',
          type: 'Date'
        },
        "dateModified": {
          name: 'dateModified',
          type: 'Date'
        },
      },
      relations: {
        users: {
          name: 'users',
          type: 'MyUser[]',
          model: 'MyUser',
          relationType: 'hasMany',
          modelThrough: 'CouponUser',
          keyThrough: 'myUserId',
          keyFrom: 'id',
          keyTo: 'couponId'
        },
      }
    }
  }
}
