/* tslint:disable */

declare var Object: any;
export interface Fcm_messageInterface {
  "id"?: any;
  "message": any;
}

export class Fcm_message implements Fcm_messageInterface {
  "id": any;
  "message": any;
  constructor(data?: Fcm_messageInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Fcm_message`.
   */
  public static getModelName() {
    return "Fcm_message";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Fcm_message for dynamic purposes.
  **/
  public static factory(data: Fcm_messageInterface): Fcm_message{
    return new Fcm_message(data);
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
      name: 'Fcm_message',
      plural: 'Fcm_messages',
      path: 'Fcm_messages',
      idName: 'id',
      properties: {
        "id": {
          name: 'id',
          type: 'any'
        },
        "message": {
          name: 'message',
          type: 'any'
        },
      },
      relations: {
      }
    }
  }
}
