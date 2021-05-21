/* tslint:disable */
import {
  Company,
  Photo,
  Profile,
  Project,
  Payment
} from '../index';

declare var Object: any;
export interface BookingInterface {
  "id"?: any;
  "state": string;
  "companyId"?: any;
  "clientId"?: any;
  "profileId"?: any;
  "projectId"?: any;
  company?: Company;
  companySign?: Photo;
  clientSign?: Photo;
  client?: Profile;
  project?: Project;
  payment?: Payment;
}

export class Booking implements BookingInterface {
  "id": any;
  "state": string;
  "companyId": any;
  "clientId": any;
  "profileId": any;
  "projectId": any;
  company: Company;
  companySign: Photo;
  clientSign: Photo;
  client: Profile;
  project: Project;
  payment: Payment;
  constructor(data?: BookingInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Booking`.
   */
  public static getModelName() {
    return "Booking";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Booking for dynamic purposes.
  **/
  public static factory(data: BookingInterface): Booking{
    return new Booking(data);
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
      name: 'Booking',
      plural: 'Bookings',
      path: 'Bookings',
      idName: 'id',
      properties: {
        "id": {
          name: 'id',
          type: 'any'
        },
        "state": {
          name: 'state',
          type: 'string',
          default: 'initialized'
        },
        "companyId": {
          name: 'companyId',
          type: 'any'
        },
        "clientId": {
          name: 'clientId',
          type: 'any'
        },
        "profileId": {
          name: 'profileId',
          type: 'any'
        },
        "projectId": {
          name: 'projectId',
          type: 'any'
        },
      },
      relations: {
        company: {
          name: 'company',
          type: 'Company',
          model: 'Company',
          relationType: 'belongsTo',
                  keyFrom: 'companyId',
          keyTo: 'id'
        },
        companySign: {
          name: 'companySign',
          type: 'Photo',
          model: 'Photo',
          relationType: 'hasOne',
                  keyFrom: 'id',
          keyTo: 'bookingId'
        },
        clientSign: {
          name: 'clientSign',
          type: 'Photo',
          model: 'Photo',
          relationType: 'hasOne',
                  keyFrom: 'id',
          keyTo: 'bookingId'
        },
        client: {
          name: 'client',
          type: 'Profile',
          model: 'Profile',
          relationType: 'belongsTo',
                  keyFrom: 'clientId',
          keyTo: 'id'
        },
        project: {
          name: 'project',
          type: 'Project',
          model: 'Project',
          relationType: 'belongsTo',
                  keyFrom: 'projectId',
          keyTo: 'id'
        },
        payment: {
          name: 'payment',
          type: 'Payment',
          model: 'Payment',
          relationType: 'hasOne',
                  keyFrom: 'id',
          keyTo: 'bookingId'
        },
      }
    }
  }
}
