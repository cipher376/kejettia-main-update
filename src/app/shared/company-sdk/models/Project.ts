/* tslint:disable */
import {
  Photo
} from '../index';

declare var Object: any;
export interface ProjectInterface {
  "id"?: any;
  "name": string;
  "description": string;
  "isCompleted": boolean;
  "dateCommenced"?: Date;
  "dateCompleted"?: Date;
  "expectedCompletionDate"?: Date;
  "state": string;
  "dateCreated"?: Date;
  "dateModified"?: Date;
  photos?: Photo[];
}

export class Project implements ProjectInterface {
  "id": any;
  "name": string;
  "description": string;
  "isCompleted": boolean;
  "dateCommenced": Date;
  "dateCompleted": Date;
  "expectedCompletionDate": Date;
  "state": string;
  "dateCreated": Date;
  "dateModified": Date;
  photos: Photo[];
  constructor(data?: ProjectInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Project`.
   */
  public static getModelName() {
    return "Project";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Project for dynamic purposes.
  **/
  public static factory(data: ProjectInterface): Project{
    return new Project(data);
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
      name: 'Project',
      plural: 'Projects',
      path: 'Projects',
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
        "description": {
          name: 'description',
          type: 'string'
        },
        "isCompleted": {
          name: 'isCompleted',
          type: 'boolean',
          default: false
        },
        "dateCommenced": {
          name: 'dateCommenced',
          type: 'Date'
        },
        "dateCompleted": {
          name: 'dateCompleted',
          type: 'Date'
        },
        "expectedCompletionDate": {
          name: 'expectedCompletionDate',
          type: 'Date'
        },
        "state": {
          name: 'state',
          type: 'string',
          default: 'initialized'
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
        photos: {
          name: 'photos',
          type: 'Photo[]',
          model: 'Photo',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'projectId'
        },
      }
    }
  }
}
