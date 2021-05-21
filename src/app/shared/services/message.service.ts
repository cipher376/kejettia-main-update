import { MessageApi } from './../store-sdk/services/custom/Message';
import { Message } from './../store-sdk/models/Message';
import { Injectable } from '@angular/core';
import { SignalService } from './signal.service';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { MyLocalStorageService } from './local-storage.service';


@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private _localStorage: MyLocalStorageService,
    private _signalService: SignalService,
    private msgService: MessageApi,
    public snackBar: MatSnackBar,
  ) {
  }

  sendMessage(message: Message) {
    return this.msgService.create(message).pipe(
      map((msg) => {
        this.snackBar.open('Message sent!', '×',
        { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
        return msg;
      }), catchError((e) => this.handleError(e))
    );
  }


  private handleError(e: any) {
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
