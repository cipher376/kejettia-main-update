import { environment } from 'src/environments/environment';
import { storeApiUrl } from '../../config';
import { STORE_ROOT } from './navigation.service';
import { Injectable } from '@angular/core';
import { Order, Cart, OrderApi } from '../store-sdk';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaystackService {
  constructor(
    private orderApi: OrderApi,
    private http: HttpClient,
  ) { }



  verifyPayment(ref: string) {
    const url = `${environment.storeApiUrl}/paystack/verify-payment?ref=${ref}`;
    return this.http.get(url).pipe(
      map(res => {
        console.log(res);
        return res as any;
      }),
      catchError(e => this.handleError(e))
    );
  }








  handleError(e: any) {
    console.log(e);
    const message = '';
    if (e.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', e.error.message);
      console.log('No connection');
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${e.status}, ` + `body was: ${e.code}`
      );
    }
    // return an observable with a user-facing error message
    return throwError('System error, please report to: antiamoah890@gmail.com');
  }
}
