import { CartService } from 'src/app/shared/services/cart.service';
import { HttpClient } from '@angular/common/http';
import { MY_ACTION, SignalService } from './signal.service';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { MyLocalStorageService } from './local-storage.service';
import { ConsolidatedOrder, Order, ORDER_STATE } from 'src/app/models';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';



@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(
    private fstore: MyLocalStorageService,
    private http: HttpClient,
    private signal: SignalService,
    private cartService: CartService,
    private userService: UserService
  ) {
  }

  createUpdateOrder(storeId: any, userId: any, order: Order) {
    order.storeId = storeId;
    order.userId = userId;
    if (!this.validateOrder(order)) {
      return undefined;
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
        this.setOrdersLocal(res);
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }


  // getOrders(state?: ORDER_STATE) {
  //   const filter = {
  //     order: 'id DESC',
  //     include: [
  //       {
  //         relation: 'cartItems',
  //         scope: {
  //           include: [{
  //             relation: 'product'
  //           }]
  //         }
  //       },
  //       {
  //         relation: 'store',
  //         scope: {
  //           include: [{
  //             relation: 'address'
  //           }]
  //         }
  //       },
  //       {
  //         relation: 'deliveryAddress'
  //       }
  //     ]
  //   } as any;

  //   if (state) {
  //     filter.where = { state };
  //   }

  //   const url = `${environment.store_api_root_url}/orders/?filter=${JSON.stringify(filter)}`
  //   return this.http.get<Order[]>(url).pipe(
  //     map((res: Order[]) => {
  //       this.setOrdersLocal(res);
  //       return res;
  //     }),
  //     catchError(e => this.handleError(e))
  //   );
  // }


  getOrderById(orderId: any) {
    const url = `${environment.store_api_root_url}/orders/${orderId}`
    return this.http.get<Order>(url).pipe(
      map((res: Order) => {
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }

  getConsolidatedOrderById(orderId: any) {
    const filter = {
      include: [
        {
          relation: 'orders',
          scope: {
            include: [
              {
                relation: 'cartItems',
                scope: {
                  include: [
                    {
                     relation: 'product',
                     scope: {
                       include:[
                         'photos'
                       ]
                     }
                    }
                  ]
                }
              }
            ]
          }
        },
        {
          relation: 'deliveryAddress',
          scope: {
            include: [
              {
                relation: 'address',
              }
            ]
          }
        }
      ]
    }
    const url = `${environment.store_api_root_url}/consolidated-orders/${orderId}?filter=${JSON.stringify(filter)}`
    return this.http.get<ConsolidatedOrder>(url).pipe(
      map((res: ConsolidatedOrder) => {
        this.setSelectedConsolidatedOrderLocal(res);
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }

  deleteOrderFromUser(userId: any, order: Order) {
    // if (userId != order.userId) {
    //   console.log('Order does not belongs to user');
    //   return undefined;
    // }
    // if(!order?.storeId){
    //   console.log('Order object is invalid');
    //   return undefined;
    // }
    // order.visibleToUser = false;
    // return this.createUpdateOrder(order.storeId,userId,order);
  }




  createConsolidatedOrder(userId: any, order: ConsolidatedOrder) {
    if (!userId) {
      userId = this.userService.getLoggedUserLocalSync()?.id;
    }
    if (!userId) {
      console.error('User must logged in to create orders');
      return undefined;
    }
    order.userId = userId;
    return this.http.post<ConsolidatedOrder>(environment.store_api_root_url + `/users/${userId}/consolidated-orders`, order).pipe(
      map(res => {
        this.setSelectedConsolidatedOrderLocal(res);
        // Reload the cart
        this.cartService.getCart(userId).subscribe(() => { });
        return res as any;
      }),
      catchError(e => this.handleError(e))
    );
  }

  getConsolidatedOrders(userId: any) {
    const filter = {
      where: {
        visibleToUser: true
      },
      include: [
        {
          relation: 'orders',
          scope: {
            include: [
              {
                relation: 'cartItems',
                scope: {
                  include: [
                    {
                     relation: 'product',
                     scope: {
                       include:[
                         'photos'
                       ]
                     }
                    }
                  ]
                }
              }
            ]
          }
        },
        {
          relation: 'deliveryAddress',
          scope: {
            include: [
              {
                relation: 'address',
              }
            ]
          }
        }
      ]
    }

    const url = `${environment.store_api_root_url}/users/${userId}/consolidated-orders?filter=${JSON.stringify(filter)}`
    return this.http.get<ConsolidatedOrder[]>(url).pipe(
      map(res => {
        this.setConsolidatedOrdersLocal(res);
        this.signal.sendAction(MY_ACTION.ordersLoaded);
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }


  deleteConsolidatedOrderFromUser(orderId: any) {
    const url = `${environment.store_api_root_url}/consolidated-orders/${orderId}/fromUser`
    return this.http.delete(url).pipe(
      map(res => {
        this.signal.sendAction(MY_ACTION.ordersLoaded);
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }



  verifyOrderPayment(orderId: any, ref: string) {
    const url = `${environment.store_api_root_url}/consolidated-orders/${orderId}/verify-payment/${ref}`;
    return this.http.get(url).pipe(
      map(res => {
        console.log(res);
        return res as any;
      }),
      catchError(e => this.handleError(e))
    );
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





  setSelectedConsolidatedOrderLocal(order: ConsolidatedOrder) {
    this.fstore.setObjectSync('consolidated_order', order);
  }

  getSelectedConsolidatedOrderLocal(): ConsolidatedOrder {
    return this.fstore.getObjectSync('consolidated_order');
  }

  setConsolidatedOrdersLocal(orders: ConsolidatedOrder[]) {
    this.fstore.setObjectSync('consolidated_orders', orders);
  }

  getConsolidatedOrdersLocal(): ConsolidatedOrder[] {
    return this.fstore.getObjectSync('consolidated_orders');
  }

  setOrdersLocal(order: Order[]) {
    this.fstore.setObjectSync('orders', order);
  }

  getOrdersLocal(): Order[] {
    return this.fstore.getObjectSync('orders');
  }


  setSelectedOrderLocal(order: Order) {
    this.fstore.setObjectSync('order', order);
  }

  getSelectedOrderLocal(): Order {
    return this.fstore.getObjectSync('order');
  }


  clearOrders() {
    this.fstore.remove('orders');
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
    return throwError('System error, please report to: admin@kejettia.com');
  }
}
