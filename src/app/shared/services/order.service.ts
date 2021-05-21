import { StoreService } from 'src/app/components/shared/services/store.service';
import { MY_ACTION, SignalService } from './signal.service';
import { CartService } from './cart.service';
import { CartItemApi } from './../store-sdk/services/custom/CartItem';
import { ProductService } from './product.service';
import { Injectable } from '@angular/core';
import { Order, Cart, OrderApi, DeliveryAddressApi, DeliveryAddress, CartItem } from '../store-sdk';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { MyUserApi } from '../identity-sdk';
import { MatDialog, MatSnackBar } from '@angular/material';
import { MyLocalStorageService } from './local-storage.service';
import { ConfirmDiaglogComponent } from '../ui-components/confirm-diaglog/confirm-diaglog.component';

export enum OrderState {
  NEW = 0, // Order created
  PENDING = 1, // Payment paid
  COMPLETE = 2, // Item shiped or delivered
  UNKNOWN = 3, // Still processing payment,
  CANCELLED = 4 // transaction cancelled
}

export const ORDER_STATE = ['NEW', 'PENDING', 'COMPLETE', 'UNKNOWN', 'CANCELLED'];


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(
    private orderApi: OrderApi,
    private _myUserApi: MyUserApi,
    private _localStore: MyLocalStorageService,
    private _deliveryAddressApi: DeliveryAddressApi,
    public snackBar: MatSnackBar,
    private productService: ProductService,
    private cartItemApi: CartItemApi,
    private cartService: CartService,
    private signal: SignalService,
    public dialog: MatDialog,
    private storeService: StoreService

  ) {
  }

  createUpdateOrder(order: Order) {
    if (!this.validateOrder(order)) {
      return;
    }
    // validate order
    return this.orderApi.patchOrCreate(order).pipe(
      map((res) => {
        console.log(res);
        return res;
      })
    );
  }

  validateOrder(order: Order) {
    if (!order.myUserId) {
      // alert('Invalid order');
      console.log('Order is invalid', order);
      return false;
    }
    return true;
  }

  getOrdersByUser(myUserId: any = null) {
    if (!myUserId) {
      myUserId = this._myUserApi.getCurrentId();
      // console.log(myUserId)
    }
    const filter = {
      order: 'id DESC',
      where: {
        myUserId,
        visibleToUser: true
      },
      include: [
        {
          relation: 'cartItems',
          scope: {
            include: {
              relation: 'productItem'
            }
          }
        },
        {
          relation: 'store',
          scope: {
            include: {
              relation: 'address'
            }
          }
        },
        {
          relation: 'deliveryAddress'
        }
      ]
    };

    return this.orderApi.find(filter).pipe(
      map((res: Order[]) => {
        console.log(res);
        res = res.filter(order => {
          return order.visibleToUser;
        });
        this.saveOrdersLocal(res);
        console.log(res);
        return res;
      })
    );
  }

  getOrdersByStore() {

  }

  getOrderById(orderId: any) {
    return this.orderApi.findById<Order>(orderId).pipe(
      map((res: Order) => {
        console.log(res);
        return res;
      })
    );
  }


  deleteOrderFromUser(order: Order) {
    const dialogRef = this.dialog.open(ConfirmDiaglogComponent, {
      width: '250px',
      data: { msg: 'Do you want to permanently delete this order?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        order.visibleToUser = false;
        return this.createUpdateOrder(order).subscribe(_ => {
          console.log(result);
          this.signal.sendAction(MY_ACTION.ordersChangedRemote);
        }
        );
      }
    });
  }

  async cancelOrder(order: Order) {
    // show dialog
    const dialogRef = this.dialog.open(ConfirmDiaglogComponent, {
      width: '250px',
      data: { msg: 'Do you want to permanently delete this order?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        console.log(result);
        order.visibleToUser = false;
        if (order.state !== OrderState.COMPLETE && order.state !== OrderState.PENDING) {
          order.state = OrderState.CANCELLED;
        }
        return this.createUpdateOrder(order).subscribe(_ => {
          this.signal.sendAction(MY_ACTION.ordersChangedRemote);
        });
      }
    });

  }

  saveOrdersLocal(orders: Order[]) {
    this._localStore.setObject('orders', orders).then(_ => _);
    this.signal.sendAction(MY_ACTION.ordersLoaded);
  }

  async getOrdersLocal(): Promise<Order[]> {
    return await this._localStore.getObject('orders');

  }

  async getSelectedOrderLocal(): Promise<Order> {
    return await this._localStore.getObject('selected_order');
  }

  async setSelectedOrderLocal(order: Order) {
    this._localStore.setObject('selected_order', order).then(_ => _);
  }

  async moveCartItemToOrder(item: CartItem) {
    let message, status;
    const myUserId = this._myUserApi.getCurrentId();
    const storeId = await this.storeService.getStoreIdLocal();
    if (!myUserId || !storeId) {
      console.log('No user or store specified');
      return;
    }
    if (!item.orderId) {
      message = 'Item cannot be purchased. It might be out of stock.';
      status = 'failed';
      this.snackBar.open(message, '×', {
        panelClass: [status],
        verticalPosition: 'top', duration: 3000
      });
      throwError('Some items are invalid');
      return;
    }
    // move from cartitem
    item.cartId = '';


    // Check if product is in stock
    const productsInStock = await this.productService.countProductInStock(item.productItemId);
    if (item.quantity >= productsInStock) {
      // out of stock
      message = 'Some items are out of stock. Order will be cancelled!';
      status = 'failed';
      this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });
      throwError('Some items are invalid');
      return;
    }
    return this.cartItemApi.patchOrCreate(item).pipe(
      map((res: CartItem) => {
        console.log(res);
        if (res) {
          // message = 'Item in cart updated!';
          // status = 'Success';
          // this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });

          // reload cart remote
          this.cartService.getCart(storeId, myUserId).subscribe(_ => _);
        }
        return res;
      }), catchError((e) => this.handleError(e)));
  }


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
    return throwError('System error, please report to: antiamoah890@gmail.com');
  }
}
