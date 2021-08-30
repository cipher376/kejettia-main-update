import { AlertComponent } from './../alert/alert.component';
import { ConsolidatedOrder } from './../../models/Order';
import { User } from './../../models/user';
import { CartService } from 'src/app/shared/services/cart.service';
// import { AlertDialogComponent } from './../../shared/ui-components/alert-dialog/alert-dialog.component';
// import { PaystackService } from './../../shared/services/paystack.service';
// import { ORDER_STATE } from './../../shared/services/order.service';
// import { MY_ACTION, SignalService } from 'src/app/components/shared/services/signal.service';
import { PAYSTACK_PUBLIC_KEY, Urls } from 'src/app/config';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../shared/services/order.service';
import { UserService } from '../../shared/services/user.service';
import { MY_ACTION, SignalService } from 'src/app/shared/services/signal.service';
import { SimpleModalService } from 'ngx-simple-modal';

import { Order, ORDER_STATE } from 'src/app/models';


@Component({
  selector: 'app-paystack',
  templateUrl: './paystack.component.html',
  styleUrls: ['./paystack.component.scss']
})
export class PaystackComponent implements OnInit, AfterViewInit {

  user: User;
  consolidatedOrder: ConsolidatedOrder

  reference = '';
  title = '';
  currency = 'GHS';

  key = PAYSTACK_PUBLIC_KEY;
  options = {} as any;

  style = { 'background-color': '#3dc93d !important' };

  constructor(
    private orderService: OrderService,
    public userService: UserService,
    public router: Router,
    private signal: SignalService,
    private modal: SimpleModalService
  ) { }


  ngOnInit() {
    this.user = this.userService.getLoggedUserLocalSync();
    this.consolidatedOrder = this.orderService.getSelectedConsolidatedOrderLocal(); // compressed consolidated order
    if (this.consolidatedOrder) {
      this.loadOrder();
    }
  }

  ngAfterViewInit() {
  }

  isNotPaid() {
    if (this.consolidatedOrder?.state === ORDER_STATE.NEW
      || this.consolidatedOrder?.state === ORDER_STATE.CANCELLED) {
      return true;
    }
    return false;
  }

  paymentInit() {
    console.log('Payment initialized');
    this.signal.sendAction(MY_ACTION.paystackTransactionInitiated);

  }

  paymentDone(ref: any) {
    this.title = 'Payment successful';
    console.log(this.title, ref);
    this.signal.sendAction(MY_ACTION.paystackTransactionSuccess);

    // call the backend to verify the transaction
    this.orderService.verifyOrderPayment(this.consolidatedOrder?.id, ref.reference).subscribe(data => {
      if (data.status === 'success') {
        this.orderService.getConsolidatedOrderById(this.consolidatedOrder?.id).subscribe(order => {
          window.location.reload();
        });
      }
    });
  }

  paymentAlert(message) {
    let disposable = this.modal.addModal(AlertComponent, {
      title: 'Payment status',
      message
    }).subscribe(() => {
      setTimeout(() => {
        disposable.unsubscribe();
      }, 5000);
    })
  }

  paymentCancel() {
    let disposable = this.modal.addModal(AlertComponent, {
      title: 'Payment status',
      message: 'Payment Cancelled'
    }).subscribe(() => {
      setTimeout(() => {
        disposable.unsubscribe();
        window.location.reload();
      }, 100);
    })

  }

  initOptions() {
    if (!this.user) {
      alert('Please login');
      this.router.navigateByUrl(Urls.login)
      return;
    }
    if (!this.consolidatedOrder?.grandTotal || this.consolidatedOrder?.grandTotal <= 0) {
      // alert('Order cannot be processed, try again later');
      return;
    }

    let addressString = '';
    if (this.user?.address) {
      // use logged user's original address
      addressString = `${this.user?.address?.apartment} ${this.user?.address?.city} ${this.user?.address?.state} ${this.user?.address?.country}`
    } else {
      addressString = `${this.consolidatedOrder?.deliveryAddress?.address?.suburb} ${this.consolidatedOrder?.deliveryAddress?.address?.city}
      ${this.consolidatedOrder?.deliveryAddress?.address?.state} ${this.consolidatedOrder?.deliveryAddress?.address?.country}`
    }
    this.options = {
      key: this.key,
      email: this.user.email,
      amount: (this.consolidatedOrder.grandTotal * 100), // convert from pesewas to cedi
      ref: `KJT-${this.consolidatedOrder.id}-${Math.ceil(Math.random() * 10e5)}`,
      currency: this.currency,
      metadata: {
        name: this.user?.profile?.firstName + ' ' + this.user?.profile?.lastName + ' ' + this.user?.profile?.otherName,
        address: addressString,
        id: this.user.id
      }
    };
  }

  loadOrder() {
    this.orderService.getConsolidatedOrderById(this.consolidatedOrder?.id)?.subscribe(consOrder => {
      this.consolidatedOrder = consOrder;
      if (this.consolidatedOrder) {
        this.initOptions();
      }
    });
  }

}
