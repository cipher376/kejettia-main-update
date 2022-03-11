import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { MY_ACTION, SignalService } from './signal.service';
import { Subject, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { MyLocalStorageService } from './local-storage.service';
import { Message } from 'src/app/models/message';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserConfig } from 'src/app/models';
import { UtilityService } from '.';

export interface SortedMessages {
  read: Message[];
  unread: Message[];
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private localStorage: MyLocalStorageService,
    private signal: SignalService,
    private http: HttpClient,
    private toaster: ToastrService
    // private msgApi: MessageApi,
  ) {
  }

  private totalReceivedMessageSource = new Subject<number>();
  totalReceivedMessageSource$ = this.totalReceivedMessageSource.asObservable();

  private totalNewMessageSource = new Subject<number>();
  totalNewMessageSource$ = this.totalNewMessageSource.asObservable();


  private totalSentMessageSource = new Subject<number>();
  totalSentMessageSource$ = this.totalSentMessageSource.asObservable();

  private totalImportantMessageSource = new Subject<number>();
  totalImportantMessageSource$ = this.totalImportantMessageSource.asObservable();

  private totalTrashMessageSource = new Subject<number>();
  totalTrashMessageSource$ = this.totalTrashMessageSource.asObservable();



  announceTotalReceiveMessages(batch: number) {
    this.totalReceivedMessageSource.next(batch);
  }

  announceTotalNewMessages(batch: number) {
    this.totalNewMessageSource.next(batch);
  }

  announceTotalSentMessages(batch: number) {
    this.totalSentMessageSource.next(batch);
  }

  announceTotalImportantMessages(batch: number) {
    this.totalImportantMessageSource.next(batch);
  }

  announceTotalTrashMessages(batch: number) {
    this.totalTrashMessageSource.next(batch);
  }

  sendMessage(message: Message) {
    if (!message.from) {
      this.toaster.error('Provide the message sender');
      return undefined;
    } else if (!message.to) {
      this.toaster.error('Provide the message receiver');
      return undefined;
    } else if (!message.content) {
      this.toaster.error('Blank messages are not allowed');
      return undefined;
    }

    return this.http.post<Message>(environment.message_api_root_url + `/messages/create`, message).pipe(
      map(res => {
        // console.log(res);
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }

  updateMessage(message: Message) {
    if (!message?.id) {
      this.toaster.error('Something bad happened');
      console.log('Message do not have id');
      return undefined;
    }
    return this.http.patch<Message>(environment.message_api_root_url + `/messages/update`, message).pipe(
      map(res => {
        // console.log(res);
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }

  getReceivedMessagesByEmail(email: string, skip = 0, limit = 1000) {
    if (!email) {
      this.toaster.error('User email is not provided!');
      return undefined;
    }
    console.log(email);
    console.log(skip);
    console.log(limit);
    let filter: any = {
      order: 'id DESC',
      limit: limit,
      skip: skip,
      where: {
        to: email,
        isTrash: false
      },
      include: [
        {
          relation: 'replies',
        },
        {
          relation: 'photos'
        }]
    };
    filter = filter ? '?filter=' + JSON.stringify(filter) : '';
    const url = environment.message_api_root_url + '/messages/received-messages' + filter;
    return this.http.get<Message>(url).pipe(
      map(res => {
        // console.log(res);
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }

  countReceivedMessage(email: string) {
    if (!email) {
      this.toaster.error('User email is not provided!');
      return undefined;
    }
    let filter: any = {
      to: email,
      isTrash: false
    };
    filter = filter ? '?filter=' + JSON.stringify(filter) : '';
    const url = environment.message_api_root_url + '/messages/count-received-messages' + filter;
    return this.http.get<Message>(url).pipe(
      map(res => {
        // console.log(res);
        // this.announceTotalReceiveMessages(msg.count);
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }

  countNewMessage(email: string) {
    if (!email) {
      this.toaster.error('User email is not provided!');
      return undefined;
    }
    let filter: any = {
      to: email,
      isTrash: false,
      isRead: false
    };
    filter = filter ? '?filter=' + JSON.stringify(filter) : '';
    const url = environment.message_api_root_url + '/messages/count-new-messages' + filter;
    return this.http.get<Message>(url).pipe(
      map(res => {
        // console.log(res);
        // this.announceTotalNewMessages(msg.count);
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }


  getSentMessagesByEmail(email: string, skip = 0, limit = 1000) {
    if (!email) {
      this.toaster.error('Email is not provided!');
      return undefined;
    }
    let filter: any = {
      order: 'id DESC',
      limit: limit,
      skip: skip,
      where: {
        from: email
      },
      include: [
        {
          relation: 'replies',
        },
        {
          relation: 'photos'
        }]
    };

    filter = filter ? '?filter=' + JSON.stringify(filter) : '';
    const url = environment.message_api_root_url + '/messages/sent-messages-by-email' + filter;
    return this.http.get<Message>(url).pipe(
      map(res => {
        // console.log(res);
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }


  countSentMessage(email: string) {
    if (!email) {
      this.toaster.error('Email is not provided!');
      return undefined;
    }
    let filter: any = {
      from: email
    };
    filter = filter ? '?filter=' + JSON.stringify(filter) : '';
    const url = environment.message_api_root_url + '/messages/count-sent-messages' + filter;
    return this.http.get<Message>(url).pipe(
      map(res => {
        // console.log(res);
        // this.announceTotalSentMessages(msg.count);
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }

  getImportantMessagesByEmail(email: string, skip = 0, limit = 1000) {
    if (!email) {
      this.toaster.error('Email is not provided!');
      return undefined;
    }
    let filter: any = {
      order: 'id DESC',
      limit: limit,
      skip: skip,
      where: {
        and: [{ isImportant: true }, { or: [{ from: email }, { to: email }] }],
      },
      include: [
        {
          relation: 'replies',
        },
        {
          relation: 'photos'
        }]
    };

    filter = filter ? '?filter=' + JSON.stringify(filter) : '';
    const url = environment.message_api_root_url + '/messages/important-messages-by-email' + filter;
    return this.http.get<Message>(url).pipe(
      map(res => {
        // console.log(res);
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }


  countImportantMessage(email: string) {
    if (!email) {
      this.toaster.error('Email is not provided!');
      return undefined;
    }
    let filter: any = {
      and: [{ isImportant: true }, { or: [{ from: email }, { to: email }] }],
    };
    filter = filter ? '?filter=' + JSON.stringify(filter) : '';
    const url = environment.message_api_root_url + '/messages/count-sent-messages' + filter;
    return this.http.get<Message>(url).pipe(
      map(res => {
        // console.log(res);
        // this.announceTotalImportantMessages(msg.count);
        return res;
      }),
      catchError(e => this.handleError(e))
    );

  }




  getTrashMessagesByEmail(email: string, skip = 0, limit = 1000) {
    if (!email) {
      this.toaster.error('Email is not provided!');
      return undefined;
    }
    let filter: any = {
      order: 'id DESC',
      limit: limit,
      skip: skip,
      where: {
        isTrash: true,
        to: email
      },
      include: [
        {
          relation: 'replies',
        },
        {
          relation: 'photos'
        }]
    };

    filter = filter ? '?filter=' + JSON.stringify(filter) : '';
    const url = environment.message_api_root_url + '/messages/trash-messages-by-email' + filter;
    return this.http.get<Message>(url).pipe(
      map(res => {
        // console.log(res);
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }


  countTrashMessage(email: string) {
    if (!email) {
      this.toaster.error('Email is not provided!');
      return undefined;
    }
    let filter: any = {
      isTrash: true,
      to: email
    };
    filter = filter ? '?filter=' + JSON.stringify(filter) : '';
    const url = environment.message_api_root_url + '/messages/count-sent-messages' + filter;
    return this.http.get<Message>(url).pipe(
      map(res => {
        // console.log(res);
        // this.announceTotalTrashMessages(msg.count);

        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }



  sortReceivedMessage(messages: Message[]): SortedMessages {
    const sortedMsgs: SortedMessages = {} as any;
    sortedMsgs.read = [];
    sortedMsgs.unread = [];

    messages.forEach(msg => {
      // check if is read or not
      if (msg.isRead) {
        sortedMsgs.read.push(msg);
      } else {
        sortedMsgs.unread.push(msg);
      }
    });
    // console.log(sortedMsgs);
    return sortedMsgs;
  }



  setReceivedMessageBatchLocal(batch: SortedMessages) {
    this.localStorage.setObject('received_message_batch', batch).then(_ => {
      // this.signal.sendAction(MY_ACTION.newReceivedMessageBatch);
    });
  }
  async getReceivedMessageBatchLocal(): Promise<SortedMessages> {
    return await this.localStorage.getObject('received_message_batch');
  }



  async setMessageLocal(msg: Message) {
    return await this.localStorage.setObject('message', msg);
  }
  async getMessageLocal(): Promise<Message> {
    return await this.localStorage.getObject('message');
  }

  async setMessageBatchLocal(msg: Message[]) {
    return await this.localStorage.setObject('batch_message', msg);
  }
  async getMessageBatchLocal(): Promise<Message> {
    return await this.localStorage.getObject('batch_message');
  }

  private handleError(e: any): any {
    // console.log(e);
    return throwError(UtilityService.myHttpErrorFormat(e, 'user'));
  }
}
