/* tslint:disable */
/**
* @module SDKModule
* @author Jonathan Casarrubias <t:@johncasarrubias> <gh:jonathan-casarrubias>
* @license MIT 2016 Jonathan Casarrubias
* @version 2.1.0
* @description
* The SDKModule is a generated Software Development Kit automatically built by
* the LoopBack SDK Builder open source module.
*
* The SDKModule provides Angular 2 >= RC.5 support, which means that NgModules
* can import this Software Development Kit as follows:
*
*
* APP Route Module Context
* ============================================================================
* import { NgModule }       from '@angular/core';
* import { BrowserModule }  from '@angular/platform-browser';
* // App Root
* import { AppComponent }   from './app.component';
* // Feature Modules
* import { SDK[Browser|Node|Native]Module } from './shared/sdk/sdk.module';
* // Import Routing
* import { routing }        from './app.routing';
* @NgModule({
*  imports: [
*    BrowserModule,
*    routing,
*    SDK[Browser|Node|Native]Module.forRoot()
*  ],
*  declarations: [ AppComponent ],
*  bootstrap:    [ AppComponent ]
* })
* export class AppModule { }
*
**/
import { ErrorHandler } from './services/core/error.service';
import { LoopBackAuth } from './services/core/auth.service';
import { LoggerService } from './services/custom/logger.service';
import { SDKModels } from './services/custom/SDKModels';
import { InternalStorage, SDKStorage } from './storage/storage.swaps';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CookieBrowser } from './storage/cookie.browser';
import { StorageBrowser } from './storage/storage.browser';
import { SocketBrowser } from './sockets/socket.browser';
import { SocketDriver } from './sockets/socket.driver';
import { SocketConnection } from './sockets/socket.connections';
import { RealTime } from './services/core/real.time';
import { EmailApi } from './services/custom/Email';
import { MyUserApi } from './services/custom/MyUser';
import { ProfileApi } from './services/custom/Profile';
import { PhotoApi } from './services/custom/Photo';
import { ContainerApi } from './services/custom/Container';
import { BrandApi } from './services/custom/Brand';
import { MessageApi } from './services/custom/Message';
import { PaystackEventsApi } from './services/custom/PaystackEvents';
import { CompanyApi } from './services/custom/Company';
import { CompanyServiceApi } from './services/custom/CompanyService';
import { AwardApi } from './services/custom/Award';
import { BookingApi } from './services/custom/Booking';
import { CompanyWorkerApi } from './services/custom/CompanyWorker';
import { ProjectApi } from './services/custom/Project';
import { PaymentApi } from './services/custom/Payment';
import { DepositApi } from './services/custom/Deposit';
import { CompanyAddressApi } from './services/custom/CompanyAddress';
import { CompanyManagerApi } from './services/custom/CompanyManager';
/**
* @module SDKBrowserModule
* @description
* This module should be imported when building a Web Application in the following scenarios:
*
*  1.- Regular web application
*  2.- Angular universal application (Browser Portion)
*  3.- Progressive applications (Angular Mobile, Ionic, WebViews, etc)
**/
@NgModule({
  imports:      [ CommonModule, HttpClientModule ],
  declarations: [ ],
  exports:      [ ],
  providers:    [
    ErrorHandler,
    SocketConnection
  ]
})
export class SDKBrowserModule {
  static forRoot(internalStorageProvider: any = {
    provide: InternalStorage,
    useClass: CookieBrowser
  }): ModuleWithProviders<SDKBrowserModule> {
    return {
      ngModule  : SDKBrowserModule,
      providers : [
        LoopBackAuth,
        LoggerService,
        SDKModels,
        RealTime,
        EmailApi,
        MyUserApi,
        ProfileApi,
        PhotoApi,
        ContainerApi,
        BrandApi,
        MessageApi,
        PaystackEventsApi,
        CompanyApi,
        CompanyServiceApi,
        AwardApi,
        BookingApi,
        CompanyWorkerApi,
        ProjectApi,
        PaymentApi,
        DepositApi,
        CompanyAddressApi,
        CompanyManagerApi,
        internalStorageProvider,
        { provide: SDKStorage, useClass: StorageBrowser },
        { provide: SocketDriver, useClass: SocketBrowser }
      ]
    };
  }
}
/**
* Have Fun!!!
* - Jon
**/
export * from './models/index';
export * from './services/index';
export * from './lb.config';
export * from './storage/storage.swaps';
export { CookieBrowser } from './storage/cookie.browser';
export { StorageBrowser } from './storage/storage.browser';

