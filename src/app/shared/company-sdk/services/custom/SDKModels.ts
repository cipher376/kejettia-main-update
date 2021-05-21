/* tslint:disable */
import { Injectable } from '@angular/core';
import { Email } from '../../models/Email';
import { MyUser } from '../../models/MyUser';
import { Profile } from '../../models/Profile';
import { Photo } from '../../models/Photo';
import { Container } from '../../models/Container';
import { Brand } from '../../models/Brand';
import { Message } from '../../models/Message';
import { PaystackEvents } from '../../models/PaystackEvents';
import { Company } from '../../models/Company';
import { CompanyService } from '../../models/CompanyService';
import { Award } from '../../models/Award';
import { Booking } from '../../models/Booking';
import { CompanyWorker } from '../../models/CompanyWorker';
import { Project } from '../../models/Project';
import { Payment } from '../../models/Payment';
import { Deposit } from '../../models/Deposit';
import { CompanyAddress } from '../../models/CompanyAddress';
import { CompanyManager } from '../../models/CompanyManager';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    Email: Email,
    MyUser: MyUser,
    Profile: Profile,
    Photo: Photo,
    Container: Container,
    Brand: Brand,
    Message: Message,
    PaystackEvents: PaystackEvents,
    Company: Company,
    CompanyService: CompanyService,
    Award: Award,
    Booking: Booking,
    CompanyWorker: CompanyWorker,
    Project: Project,
    Payment: Payment,
    Deposit: Deposit,
    CompanyAddress: CompanyAddress,
    CompanyManager: CompanyManager,
    
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
