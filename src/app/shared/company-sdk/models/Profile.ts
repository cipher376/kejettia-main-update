/* tslint:disable */
import {
  MyUser,
  Booking
} from '../index';

declare var Object: any;
export interface ProfileInterface {
  "id"?: any;
  "myUserId"?: any;
  myUser?: MyUser;
  bookings?: Booking[];
}

export class Profile implements ProfileInterface {
  "id": any;
  "myUserId": any;
  myUser: MyUser;
  bookings: Booking[];
  constructor(data?: ProfileInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Profile`.
   */
  public static getModelName() {
    return "Profile";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Profile for dynamic purposes.
  **/
  public static factory(data: ProfileInterface): Profile{
    return new Profile(data);
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
      name: 'Profile',
      plural: 'Profiles',
      path: 'Profiles',
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
        bookings: {
          name: 'bookings',
          type: 'Booking[]',
          model: 'Booking',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'profileId'
        },
      }
    }
  }
}
