import { HttpClient } from '@angular/common/http';
import { MY_ACTION, SignalService } from './signal.service';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { MyLocalStorageService } from './local-storage.service';
import { Order, ORDER_STATE } from 'src/app/models';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(
    private fstore: MyLocalStorageService,
    private http: HttpClient,
    private signal: SignalService,
  ) {
  }

  createUpdateOrder(storeId: any, userId: any, order: Order) {
    order.storeId = storeId;
    order.userId = userId;
    if (!this.validateOrder(order)) {
      return;
    }
    // validate order
    if (order.id) { // perform update
      return this.http.patch<Order>(environment.store_api_root_url + `/stores/${order.storeId}/orders`, order).pipe(
        map(res => {
          // console.log(res);
          return order as any;
        }),
        catchError(e => this.handleError(e))
      );
    } else {
      return this.http.post<Order>(environment.store_api_root_url + `/stores/${order.storeId}/orders`, order).pipe(
        map(res => {
          // console.log(res);
          return res as any;
        }),
        catchError(e => this.handleError(e))
      );
    }
  }

  validateOrder(order: Order) {
    if (!order.userId && !order.storeId) {
      console.log('Order is invalid', order);
      return false;
    }
    return true;
  }

  getOrdersByUser(userId: any) {
    const filter = {
      order: 'id DESC',
      where: {
        userId,
        visibleToUser: true
      },
      include: [
        {
          relation: 'cartItems',
          scope: {
            include: [{
              relation: 'product'
            }]
          }
        },
        {
          relation: 'store',
          scope: {
            include: [{
              relation: 'address'
            }]
          }
        },
        {
          relation: 'deliveryAddress'
        }
      ]
    };
    const url = `${environment.store_api_root_url}/orders/?filter=${JSON.stringify(filter)}`
    return this.http.get<Order[]>(url).pipe(
      map((res: Order[]) => {
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }

  getOrdersByStore(storeId: any, state?: ORDER_STATE): any {
    if (!storeId) {
      return {} as any;
    }
    const filter = {
      order: 'id DESC',
      where: {
        storeId,
        // visibleToUser: true
      } as any,
      include: [
        {
          relation: 'cartItems',
          scope: {
            include: [{
              relation: 'product'
            }]
          }
        },
        {
          relation: 'deliveryAddress'
        }
      ]
    };

    if (state !== null || state === ORDER_STATE.NEW) {
      filter.where.state = state;
    }
    // console.log(filter);
    const url = `${environment.store_api_root_url}/orders/?filter=${JSON.stringify(filter)}`
    return this.http.get<Order[]>(url).pipe(
      map((res: Order[]) => {
        this.saveOrdersLocal(res);
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }


  getOrders(state?: ORDER_STATE) {
    const filter = {
      order: 'id DESC',
      include: [
        {
          relation: 'cartItems',
          scope: {
            include: [{
              relation: 'product'
            }]
          }
        },
        {
          relation: 'store',
          scope: {
            include: [{
              relation: 'address'
            }]
          }
        },
        {
          relation: 'deliveryAddress'
        }
      ]
    } as any;

    if (state) {
      filter.where = { state };
    }

    const url = `${environment.store_api_root_url}/orders/?filter=${JSON.stringify(filter)}`
    return this.http.get<Order[]>(url).pipe(
      map((res: Order[]) => {
        this.saveOrdersLocal(res);
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }


  getOrderById(orderId: any) {
    const url = `${environment.store_api_root_url}/orders/${orderId}`
    return this.http.get<Order>(url).pipe(
      map((res: Order) => {
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }


  deleteOrderFromUser(userId: any, order: Order) {
    if (userId != order.userId) {
      console.log('Order does not belongs to user');
      return;
    }
    if(!order?.storeId){
      console.log('Order object is invalid');
      return;
    }
    order.visibleToUser = false;
    return this.createUpdateOrder(order.storeId,userId,order);
  }



  // async cancelOrder(order: Order) {
  //   // show dialog
  //   const dialogRef = this.dialog.open(ConfirmDiaglogComponent, {
  //     width: '250px',
  //     data: { msg: 'Do you want to permanently delete this order?' }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(result);
  //     if (result) {
  //       console.log(result);
  //       order.visibleToUser = false;
  //       order.state = OrderState.CANCELLED;
  //       return this.createUpdateOrder(order).subscribe(_ => {
  //         this.signal.sendAction(MY_ACTION.ordersChangedRemote);
  //       });
  //     }
  //   });

  // }

  saveOrdersLocal(orders: Order[]) {
    this.fstore.setObject('orders', orders).then(_ => _);
    this.signal.sendAction(MY_ACTION.ordersLoaded);
  }

  async getOrdersLocal(): Promise<Order[]> {
    return await this.fstore.getObject('orders');

  }

  async getSelectedOrderLocal(): Promise<Order> {
    return await this.fstore.getObject('selected_order');
  }

  async setSelectedOrderLocal(order: Order) {
    this.fstore.setObject('selected_order', order).then(_ => _);
  }

  async clearOrdersLocal() {
    this.fstore.remove('orders');
  }

  // async moveCartItemToOrder(item: CartItem) {
  //   let message, status;
  //   if (!item.orderId) {
  //     message = 'Item cannot be purchased. It might be out of stock.';
  //     status = 'failed';
  //     this.snackBar.open(message, '×', {
  //       panelClass: [status],
  //       verticalPosition: 'top', duration: 3000
  //     });
  //     throwError('Some items are invalid');
  //     return;
  //   }
  //   // move from cartitem
  //   item.cartId = '';


  //   // Check if product is in stock
  //   const productsInStock = await this.productService.countProductInStock(item.productItemId);
  //   if (item.quantity >= productsInStock) {
  //     // out of stock
  //     message = 'Some items are out of stock. Order will be cancelled!';
  //     status = 'failed';
  //     this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });
  //     throwError('Some items are invalid');
  //     return;
  //   }
  //   return this.cartItemApi.patchOrCreate(item).pipe(
  //     map((res: CartItem) => {
  //       console.log(res);
  //       if (res) {
  //         // message = 'Item in cart updated!';
  //         // status = 'Success';
  //         // this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });

  //         // reload cart remote
  //         this.cartService.getCart().subscribe(_ => _);
  //       }
  //       return res;
  //     }), catchError((e) => this.handleError(e)));
  // }


  // saveDeliveryInfo(info: DeliveryAddress) {
  //   if (!info) {
  //     console.error('Order must be set for delivery information');
  //     return;
  //   }
  //   return this._deliveryAddressApi.patchOrCreate(info).pipe(
  //     map((res) => {
  //       console.log(res);
  //       return res;
  //     })
  //   );
  // }


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
    return throwError('System error, please report to: admin@kejettia.com');
  }
}
