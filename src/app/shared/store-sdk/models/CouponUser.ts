/* tslint:disable */
import {
  Coupon,
  MyUser
} from '../index';

declare var Object: any;
export interface CouponUserInterface {
  "id"?: any;
  "couponId"?: any;
  "myUserId"?: any;
  coupon?: Coupon;
  myUser?: MyUser;
}

export class CouponUser implements CouponUserInterface {
  "id": any;
  "couponId": any;
  "myUserId": any;
  coupon: Coupon;
  myUser: MyUser;
  constructor(data?: CouponUserInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `CouponUser`.
   */
  public static getModelName() {
    return "CouponUser";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of CouponUser for dynamic purposes.
  **/
  public static factory(data: CouponUserInterface): CouponUser{
    return new CouponUser(data);
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
      name: 'CouponUser',
      plural: 'CouponUsers',
      path: 'CouponUsers',
      idName: 'id',
      properties: {
        "id": {
          name: 'id',
          type: 'any'
        },
        "couponId": {
          name: 'couponId',
          type: 'any'
        },
        "myUserId": {
          name: 'myUserId',
          type: 'any'
        },
      },
      relations: {
        coupon: {
          name: 'coupon',
          type: 'Coupon',
          model: 'Coupon',
          relationType: 'belongsTo',
                  keyFrom: 'couponId',
          keyTo: 'id'
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
