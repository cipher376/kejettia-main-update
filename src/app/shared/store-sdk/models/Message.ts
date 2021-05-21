/* tslint:disable */
import {
  Photo
} from '../index';

declare var Object: any;
export interface MessageInterface {
  "id"?: any;
  "fullname": string;
  "from": string;
  "to": string;
  "cc"?: string;
  "subject"?: string;
  "content": string;
  "phone"?: string;
  "hasAttachment"?: boolean;
  "isImportant"?: boolean;
  "isRead"?: boolean;
  "isTrash"?: boolean;
  "isPermanentDelete"?: boolean;
  "replyId"?: any;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  photos?: Photo[];
  replies?: Message[];
}

export class Message implements MessageInterface {
  "id": any;
  "fullname": string;
  "from": string;
  "to": string;
  "cc": string;
  "subject": string;
  "content": string;
  "phone": string;
  "hasAttachment": boolean;
  "isImportant": boolean;
  "isRead": boolean;
  "isTrash": boolean;
  "isPermanentDelete": boolean;
  "replyId": any;
  "createdAt": Date;
  "updatedAt": Date;
  photos: Photo[];
  replies: Message[];
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
        "cc": {
          name: 'cc',
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
        "hasAttachment": {
          name: 'hasAttachment',
          type: 'boolean',
          default: false
        },
        "isImportant": {
          name: 'isImportant',
          type: 'boolean',
          default: false
        },
        "isRead": {
          name: 'isRead',
          type: 'boolean',
          default: false
        },
        "isTrash": {
          name: 'isTrash',
          type: 'boolean',
          default: false
        },
        "isPermanentDelete": {
          name: 'isPermanentDelete',
          type: 'boolean',
          default: false
        },
        "replyId": {
          name: 'replyId',
          type: 'any'
        },
        "createdAt": {
          name: 'createdAt',
          type: 'Date'
        },
        "updatedAt": {
          name: 'updatedAt',
          type: 'Date'
        },
      },
      relations: {
        photos: {
          name: 'photos',
          type: 'Photo[]',
          model: 'Photo',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'messageId'
        },
        replies: {
          name: 'replies',
          type: 'Message[]',
          model: 'Message',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'replyId'
        },
      }
    }
  }
}
