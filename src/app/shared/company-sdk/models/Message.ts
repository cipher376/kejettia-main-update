/* tslint:disable */

declare var Object: any;
export interface MessageInterface {
  "id"?: any;
  "fullname": string;
  "from": string;
  "to": string;
  "subject"?: string;
  "content": string;
  "phone"?: string;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  "companyId"?: any;
}

export class Message implements MessageInterface {
  "id": any;
  "fullname": string;
  "from": string;
  "to": string;
  "subject": string;
  "content": string;
  "phone": string;
  "createdAt": Date;
  "updatedAt": Date;
  "companyId": any;
  constructor(data?: MessageInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Message`.
   */
  public static getModelName() {
    return "Message";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Message for dynamic purposes.
  **/
  public static factory(data: MessageInterface): Message{
    return new Message(data);
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
      name: 'Message',
      plural: 'Messages',
      path: 'Messages',
      idName: 'id',
      properties: {
        "id": {
          name: 'id',
          type: 'any'
        },
        "fullname": {
          name: 'fullname',
          type: 'string'
        },
        "from": {
          name: 'from',
          type: 'string'
        },
        "to": {
          name: 'to',
          type: 'string'
        },
        "subject": {
          name: 'subject',
          type: 'string'
        },
        "content": {
          name: 'content',
          type: 'string'
        },
        "phone": {
          name: 'phone',
          type: 'string'
        },
        "createdAt": {
          name: 'createdAt',
          type: 'Date'
        },
        "updatedAt": {
          name: 'updatedAt',
          type: 'Date'
        },
        "companyId": {
          name: 'companyId',
          type: 'any'
        },
      },
      relations: {
      }
    }
  }
}
