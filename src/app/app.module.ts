import { SharedModule } from './shared/shared.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SDKBrowserModule as identitySDKBrowserModule } from './shared/identity-sdk';
import { SDKBrowserModule as StoreSDKBrowserModule } from './shared/store-sdk';
import { SDKBrowserModule as companySDKBrowserModule } from './shared/company-sdk';
import { AngularWebStorageModule } from 'angular-web-storage';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularWebStorageModule,
    identitySDKBrowserModule.forRoot(),
    StoreSDKBrowserModule.forRoot(),
    companySDKBrowserModule.forRoot(),
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
