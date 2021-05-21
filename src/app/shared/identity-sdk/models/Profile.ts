/* tslint:disable */
import {
  MyUser,
  Photo,
  Address
} from '../index';

declare var Object: any;
export interface ProfileInterface {
  "id"?: any;
  "gender": string;
  "fname": string;
  "lname": string;
  "mname"?: string;
  "dob": Date;
  "bucket": string;
  "about"?: string;
  "position"?: string;
  "myUserId"?: any;
  "dateCreated"?: Date;
  "dateModified"?: Date;
  myUser?: MyUser;
  photo?: Photo;
  address?: Address;
}

export class Profile implements ProfileInterface {
  "id": any;
  "gender": string;
  "fname": string;
  "lname": string;
  "mname": string;
  "dob": Date;
  "bucket": string;
  "about": string;
  "position": string;
  "myUserId": any;
  "dateCreated": Date;
  "dateModified": Date;
  myUser: MyUser;
  photo: Photo;
  address: Address;
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
        "gender": {
          name: 'gender',
          type: 'string'
        },
        "fname": {
          name: 'fname',
          type: 'string'
        },
        "lname": {
          name: 'lname',
          type: 'string'
        },
        "mname": {
          name: 'mname',
          type: 'string'
        },
        "dob": {
          name: 'dob',
          type: 'Date'
        },
        "bucket": {
          name: 'bucket',
          type: 'string'
        },
        "about": {
          name: 'about',
          type: 'string'
        },
        "position": {
          name: 'position',
          type: 'string'
        },
        "myUserId": {
          name: 'myUserId',
          type: 'any'
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
        myUser: {
          name: 'myUser',
          type: 'MyUser',
          model: 'MyUser',
          relationType: 'belongsTo',
                  keyFrom: 'myUserId',
          keyTo: 'id'
        },
        photo: {
          name: 'photo',
          type: 'Photo',
          model: 'Photo',
          relationType: 'hasOne',
                  keyFrom: 'id',
          keyTo: 'profileId'
        },
        address: {
          name: 'address',
          type: 'Address',
          model: 'Address',
          relationType: 'hasOne',
                  keyFrom: 'id',
          keyTo: 'profileId'
        },
      }
    }
  }
}
