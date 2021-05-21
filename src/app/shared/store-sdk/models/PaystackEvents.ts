/* tslint:disable */

declare var Object: any;
export interface PaystackEventsInterface {
  "event": string;
  "data": any;
  "id"?: any;
}

export class PaystackEvents implements PaystackEventsInterface {
  "event": string;
  "data": any;
  "id": any;
  constructor(data?: PaystackEventsInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `PaystackEvents`.
   */
  public static getModelName() {
    return "PaystackEvents";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of PaystackEvents for dynamic purposes.
  **/
  public static factory(data: PaystackEventsInterface): PaystackEvents{
    return new PaystackEvents(data);
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
      name: 'PaystackEvents',
      plural: 'PaystackEvents',
      path: 'PaystackEvents',
      idName: 'id',
      properties: {
        "event": {
          name: 'event',
          type: 'string'
        },
        "data": {
          name: 'data',
          type: 'any'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
      },
      relations: {
      }
    }
  }
}
