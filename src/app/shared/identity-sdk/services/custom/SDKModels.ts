/* tslint:disable */
import { Injectable } from '@angular/core';
import { RoleMapping } from '../../models/RoleMapping';
import { Role } from '../../models/Role';
import { Email } from '../../models/Email';
import { Photo } from '../../models/Photo';
import { MyUser } from '../../models/MyUser';
import { Profile } from '../../models/Profile';
import { Address } from '../../models/Address';
import { Container } from '../../models/Container';
import { UserCredential } from '../../models/UserCredential';
import { UserIdentity } from '../../models/UserIdentity';
import { ApplicationCredential } from '../../models/ApplicationCredential';
import { Application } from '../../models/Application';
import { Fcm_message } from '../../models/Fcm_message';
import { FCMDevice } from '../../models/FCMDevice';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    RoleMapping: RoleMapping,
    Role: Role,
    Email: Email,
    Photo: Photo,
    MyUser: MyUser,
    Profile: Profile,
    Address: Address,
    Container: Container,
    UserCredential: UserCredential,
    UserIdentity: UserIdentity,
    ApplicationCredential: ApplicationCredential,
    Application: Application,
    Fcm_message: Fcm_message,
    FCMDevice: FCMDevice,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }

  public getAll(): Models {
    return this.models;
  }

  public getModelNames(): string[] {
    return Object.keys(this.models);
  }
}
