/* tslint:disable */
import {
  Company,
  MyUser
} from '../index';

declare var Object: any;
export interface CompanyManagerInterface {
  "id"?: any;
  "myUserId"?: any;
  "companyId"?: any;
  companies?: Company[];
  myUser?: MyUser;
  company?: Company;
}

export class CompanyManager implements CompanyManagerInterface {
  "id": any;
  "myUserId": any;
  "companyId": any;
  companies: Company[];
  myUser: MyUser;
  company: Company;
  constructor(data?: CompanyManagerInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `CompanyManager`.
   */
  public static getModelName() {
    return "CompanyManager";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of CompanyManager for dynamic purposes.
  **/
  public static factory(data: CompanyManagerInterface): CompanyManager{
    return new CompanyManager(data);
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
      name: 'CompanyManager',
      plural: 'CompanyManagers',
      path: 'CompanyManagers',
      idName: 'id',
      properties: {
        "id": {
          name: 'id',
          type: 'any'
        },
        "myUserId": {
          name: 'myUserId',
          type: 'any'
        },
        "companyId": {
          name: 'companyId',
          type: 'any'
        },
      },
      relations: {
        companies: {
          name: 'companies',
          type: 'Company[]',
          model: 'Company',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'companyManagerId'
        },
        myUser: {
          name: 'myUser',
          type: 'MyUser',
          model: 'MyUser',
          relationType: 'belongsTo',
                  keyFrom: 'myUserId',
          keyTo: 'id'
        },
        company: {
          name: 'company',
          type: 'Company',
          model: 'Company',
          relationType: 'belongsTo',
                  keyFrom: 'companyId',
          keyTo: 'id'
        },
      }
    }
  }
}
