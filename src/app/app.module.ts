import { httpInterceptorProviders } from './shared/services/my-interceptors';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularWebStorageModule } from 'angular-web-storage';
import { ToastrModule } from 'ngx-toastr';
import { Home2Component } from './app-store-pages/home2/home2.component';
import { LoaderFullComponent } from './ui-components/loader-full/loader-full.component';
import { LoaderMiniComponent } from './ui-components/loader-mini/loader-mini.component';
import { SelectModule } from 'ng-select';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularWebStorageModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    HttpClientModule,
    SelectModule
  ],
  providers: [
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
