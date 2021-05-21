/* tslint:disable */
import {
  Deposit
} from '../index';

declare var Object: any;
export interface PaymentInterface {
  "id"?: any;
  "expectedCost": number;
  "actualCost"?: number;
  "depositCount": number;
  "state": string;
  "minimumDeposit": number;
  "totalDeposit": number;
  "bookingId"?: any;
  "dateCreated"?: Date;
  "dateModified"?: Date;
  deposits?: Deposit[];
}

export class Payment implements PaymentInterface {
  "id": any;
  "expectedCost": number;
  "actualCost": number;
  "depositCount": number;
  "state": string;
  "minimumDeposit": number;
  "totalDeposit": number;
  "bookingId": any;
  "dateCreated": Date;
  "dateModified": Date;
  deposits: Deposit[];
  constructor(data?: PaymentInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Payment`.
   */
  public static getModelName() {
    return "Payment";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Payment for dynamic purposes.
  **/
  public static factory(data: PaymentInterface): Payment{
    return new Payment(data);
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
      name: 'Payment',
      plural: 'Payments',
      path: 'Payments',
      idName: 'id',
      properties: {
        "id": {
          name: 'id',
          type: 'any'
        },
        "expectedCost": {
          name: 'expectedCost',
          type: 'number',
          default: 0
        },
        "actualCost": {
          name: 'actualCost',
          type: 'number',
          default: 0
        },
        "depositCount": {
          name: 'depositCount',
          type: 'number',
          default: 0
        },
        "state": {
          name: 'state',
          type: 'string',
          default: 'initialized'
        },
        "minimumDeposit": {
          name: 'minimumDeposit',
          type: 'number',
          default: 0
        },
        "totalDeposit": {
          name: 'totalDeposit',
          type: 'number',
          default: 0
        },
        "bookingId": {
          name: 'bookingId',
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
        deposits: {
          name: 'deposits',
          type: 'Deposit[]',
          model: 'Deposit',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'paymentId'
        },
      }
    }
  }
}
