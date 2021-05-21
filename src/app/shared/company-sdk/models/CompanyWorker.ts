/* tslint:disable */
import {
  Company,
  MyUser
} from '../index';

declare var Object: any;
export interface CompanyWorkerInterface {
  "id"?: any;
  "jobDescription": string;
  "companyId"?: any;
  "dateCreated"?: Date;
  "dateModified"?: Date;
  company?: Company;
  user?: MyUser;
}

export class CompanyWorker implements CompanyWorkerInterface {
  "id": any;
  "jobDescription": string;
  "companyId": any;
  "dateCreated": Date;
  "dateModified": Date;
  company: Company;
  user: MyUser;
  constructor(data?: CompanyWorkerInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `CompanyWorker`.
   */
  public static getModelName() {
    return "CompanyWorker";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of CompanyWorker for dynamic purposes.
  **/
  public static factory(data: CompanyWorkerInterface): CompanyWorker{
    return new CompanyWorker(data);
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
      name: 'CompanyWorker',
      plural: 'CompanyWorkers',
      path: 'CompanyWorkers',
      idName: 'id',
      properties: {
        "id": {
          name: 'id',
          type: 'any'
        },
        "jobDescription": {
          name: 'jobDescription',
          type: 'string'
        },
        "companyId": {
          name: 'companyId',
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
        company: {
          name: 'company',
          type: 'Company',
          model: 'Company',
          relationType: 'hasOne',
                  keyFrom: 'id',
          keyTo: 'companyWorkerId'
        },
        user: {
          name: 'user',
          type: 'MyUser',
          model: 'MyUser',
          relationType: 'hasOne',
                  keyFrom: 'id',
          keyTo: 'companyWorkerId'
        },
      }
    }
  }
}
