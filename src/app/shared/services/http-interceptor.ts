import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { UserService } from './user.service';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  /**
   *
   */
  constructor(private userService: UserService) {

  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // All HTTP requests are going to go through this method
    // console.log('INTERCEPTOR');
    // We retrieve the token, if any
    // const token = this.userService.getToken();
    // const token = this.userService.token;

    // if content type is not set, default to  application/json
    let newHeaders = req.headers;
    // newHeaders = newHeaders.set('Access-Control-Allow-Origin', 'devtek-limited.tech');
    // console.log(req.headers);
    if (newHeaders.get('Content-Type') == null && newHeaders.get('boundary') !== null) {
      // Uploading, don't append any headers;
    } else {
      // console.log('Setting content type')
      // newHeaders = newHeaders.set('Content-Type', 'application/json');
    }
    // console.log(newHeaders.get('Content-Type'));
    // if (token) {
    //   // If we have a token, we append it to our new headers
    //   newHeaders = newHeaders.set('Authorization', ('Bearer ' + token.token));
    // }
    // Finally we have to clone our request with our new headers
    // This is required because HttpRequests are immutable
    const authReq = req.clone({ headers: newHeaders });
    // Then we return an Observable that will run the request
    // or pass it to the next interceptor if any
    return next.handle(authReq);
  }
}


// @Injectable()
// export class RootUrlInterceptor implements HttpInterceptor {
//   /**
//    *
//    */
//   constructor() {
//   }
//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

//     const authReq = req.clone({ url: `${API_ROOT_URL + req.url}` });
//     // console.log(authReq);
//     return next.handle(authReq);
//   }
// }

// @Injectable()
// export class ErrorHandlerInterceptor implements HttpInterceptor {
//   /**
//    *
//    */
//   constructor(
//     private router: Router,
//     private toaster: ToasterService
//   ) {
//   }
//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

//     // console.log('Error handling: ');
//     return next.handle(req).pipe(map(res => {
//       return res;
//     }), catchError(err => {
//       // onError
//       console.log(err);
//       let myError = err;
//       if (err instanceof HttpErrorResponse) {
//         console.log(err.status);
//         console.log(err.statusText);

//         if (err.status === 401) {
//           // redirect the user to login page
//           // 401 unauthorised user
//           console.log('Unauthenticated');
//           myError = new HttpErrorResponse({ status: 401, statusText: 'Authentication failed' });
//           this.router.navigateByUrl('/login-auth');
//           this.toaster.toast('Authentication failed, please login!');
//         } else if (err.status === 0) {
//           console.log('No connection');
//           myError = new HttpErrorResponse({ status: 0, statusText: 'No internet connection' });
//           this.toaster.toast('No connection');
//         } else if (err.status === 423) {
//           this.toaster.toast('Account deactivated');
//         } else if (err.status === 403) {
//           this.toaster.toast('Access denied');
//         } else if (err.status === 403) {
//           this.toaster.toast('Access denied');
//         } else if (err.status === 400) {
//           this.toaster.toast('Something went wrong');
//         } else if (err.status === 500) {
//           this.toaster.toast('Something went wrong');
//         } else if (err.status === 409) {
//           this.toaster.toast(err.error?.error?.message ?? 'Already in use');
//         }  else if (err.status === 404) {
//           this.toaster.toast('Connection problem');
//         }
//       }
//       return of(myError); // forward error to service or component for proper handling
//     }));
//   }
// }








/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  // { provide: HTTP_INTERCEPTORS, useClass: RootUrlInterceptor, multi: true },
  // { provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerInterceptor, multi: true },
];
