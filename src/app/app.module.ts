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
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { SimpleModalModule, defaultSimpleModalOptions } from 'ngx-simple-modal';
import { ConfirmDialogComponent } from './ui-components/confirm-dialog/confirm-dialog.component';
import { AlertComponent } from './ui-components/alert/alert.component';
import { AuthGuard } from './shared/services/guards/authGuard.service';
import { SanitizeHtmlPipe } from './shared/pipes/sanitize-html.pipe';
import { GoogleLoginComponent } from './ui-components/google-login/google-login.component';
import { RecaptchaModule } from "ng-recaptcha";


@NgModule({
  declarations: [
    AppComponent,
    ConfirmDialogComponent,
    AlertComponent,
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
    SelectModule,
    SimpleModalModule.forRoot({ container: document.body }, {
      ...defaultSimpleModalOptions, ...{
        closeOnEscape: true,
        closeOnClickOutside: true,
        // wrapperDefaultClasses: 'o-modal o-modal--fade',
        // wrapperClass: 'o-modal--fade-in',
        animationDuration: 300,
        autoFocus: true,
        draggable: true
      }
    }),
    
  ],
  providers: [
    httpInterceptorProviders,
    AuthGuard
  ],
  entryComponents: [
    ConfirmDialogComponent,
    AlertComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
