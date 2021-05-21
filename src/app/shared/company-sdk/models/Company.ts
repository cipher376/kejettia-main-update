/* tslint:disable */
import {
  MyUser,
  Photo,
  Message,
  CompanyService,
  Award,
  Booking,
  CompanyWorker,
  Project,
  CompanyAddress
} from '../index';

declare var Object: any;
export interface CompanyInterface {
  "id"?: any;
  "name": string;
  "email"?: string;
  "phone1": string;
  "phone2"?: string;
  "isRegistered": boolean;
  "longDescription"?: string;
  "shortDescription": string;
  "websiteUrl"?: string;
  "bucket": string;
  "dateCreated"?: Date;
  "dateModified"?: Date;
  "companyWorkerId"?: any;
  "companyManagerId"?: any;
  owners?: MyUser[];
  certificates?: Photo[];
  photos?: Photo[];
  messages?: Message[];
  services?: CompanyService[];
  awards?: Award[];
  bookings?: Booking[];
  workers?: CompanyWorker[];
  projects?: Project[];
  address?: CompanyAddress;
}

export class Company implements CompanyInterface {
  "id": any;
  "name": string;
  "email": string;
  "phone1": string;
  "phone2": string;
  "isRegistered": boolean;
  "longDescription": string;
  "shortDescription": string;
  "websiteUrl": string;
  "bucket": string;
  "dateCreated": Date;
  "dateModified": Date;
  "companyWorkerId": any;
  "companyManagerId": any;
  owners: MyUser[];
  certificates: Photo[];
  photos: Photo[];
  messages: Message[];
  services: CompanyService[];
  awards: Award[];
  bookings: Booking[];
  workers: CompanyWorker[];
  projects: Project[];
  address: CompanyAddress;
  constructor(data?: CompanyInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Company`.
   */
  public static getModelName() {
    return "Company";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Company for dynamic purposes.
  **/
  public static factory(data: CompanyInterface): Company{
    return new Company(data);
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
      name: 'Company',
      plural: 'Companies',
      path: 'Companies',
      idName: 'id',
      properties: {
        "id": {
          name: 'id',
          type: 'any'
        },
        "name": {
          name: 'name',
          type: 'string'
        },
        "email": {
          name: 'email',
          type: 'string'
        },
        "phone1": {
          name: 'phone1',
          type: 'string'
        },
        "phone2": {
          name: 'phone2',
          type: 'string'
        },
        "isRegistered": {
          name: 'isRegistered',
          type: 'boolean'
        },
        "longDescription": {
          name: 'longDescription',
          type: 'string'
        },
        "shortDescription": {
          name: 'shortDescription',
          type: 'string'
        },
        "websiteUrl": {
          name: 'websiteUrl',
          type: 'string'
        },
        "bucket": {
          name: 'bucket',
          type: 'string'
        },
        "dateCreated": {
          name: 'dateCreated',
          type: 'Date'
        },
        "dateModified": {
          name: 'dateModified',
          type: 'Date'
        },
        "companyWorkerId": {
          name: 'companyWorkerId',
          type: 'any'
        },
        "companyManagerId": {
          name: 'companyManagerId',
          type: 'any'
        },
      },
      relations: {
        owners: {
          name: 'owners',
          type: 'MyUser[]',
          model: 'MyUser',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'companyId'
        },
        certificates: {
          name: 'certificates',
          type: 'Photo[]',
          model: 'Photo',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'companyId'
        },
        photos: {
          name: 'photos',
          type: 'Photo[]',
          model: 'Photo',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'companyId'
        },
        messages: {
          name: 'messages',
          type: 'Message[]',
          model: 'Message',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'companyId'
        },
        services: {
          name: 'services',
          type: 'CompanyService[]',
          model: 'CompanyService',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'companyId'
        },
        awards: {
          name: 'awards',
          type: 'Award[]',
          model: 'Award',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'companyId'
        },
        bookings: {
          name: 'bookings',
          type: 'Booking[]',
          model: 'Booking',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'companyId'
        },
        workers: {
          name: 'workers',
          type: 'CompanyWorker[]',
          model: 'CompanyWorker',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'companyId'
        },
        projects: {
          name: 'projects',
          type: 'Project[]',
          model: 'Project',
          relationType: 'hasMany',
          modelThrough: 'Booking',
          keyThrough: 'projectId',
          keyFrom: 'id',
          keyTo: 'companyId'
        },
        address: {
          name: 'address',
          type: 'CompanyAddress',
          model: 'CompanyAddress',
          relationType: 'hasOne',
                  keyFrom: 'id',
          keyTo: 'companyId'
        },
      }
    }
  }
}
