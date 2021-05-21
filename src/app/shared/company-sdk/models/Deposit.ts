/* tslint:disable */

declare var Object: any;
export interface DepositInterface {
  "id"?: any;
  "reference": string;
  "dateCreated"?: Date;
  "amount": number;
  "paymentId"?: any;
  "dateModified"?: Date;
}

export class Deposit implements DepositInterface {
  "id": any;
  "reference": string;
  "dateCreated": Date;
  "amount": number;
  "paymentId": any;
  "dateModified": Date;
  constructor(data?: DepositInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Deposit`.
   */
  public static getModelName() {
    return "Deposit";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Deposit for dynamic purposes.
  **/
  public static factory(data: DepositInterface): Deposit{
    return new Deposit(data);
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
      name: 'Deposit',
      plural: 'Deposits',
      path: 'Deposits',
      idName: 'id',
      properties: {
        "id": {
          name: 'id',
          type: 'any'
        },
        "reference": {
          name: 'reference',
          type: 'string'
        },
        "dateCreated": {
          name: 'dateCreated',
          type: 'Date'
        },
        "amount": {
          name: 'amount',
          type: 'number'
        },
        "paymentId": {
          name: 'paymentId',
          type: 'any'
        },
        "dateModified": {
          name: 'dateModified',
          type: 'Date'
        },
      },
      relations: {
      }
    }
  }
}
