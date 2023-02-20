import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SimpleModalService } from 'ngx-simple-modal';
import { User, ConsolidatedOrder, ORDER_STATE } from 'src/app/models';
import { UserService, UtilityService } from 'src/app/shared/services';
import { OrderService } from 'src/app/shared/services/order.service';
import { MY_ACTION, SignalService } from 'src/app/shared/services/signal.service';

@Component({
  selector: 'app-paynow',
  templateUrl: './paynow.component.html',
  styleUrls: ['./paynow.component.scss']
})
export class PaynowComponent implements OnInit, AfterViewInit {
  user: User;
  consolidatedOrder: ConsolidatedOrder

  reference = '';
  title = '';
  currency = 'CAD';

  options = {} as any;

  style = { 'background-color': '#3dc93d !important' };

  isProcessing = false;
  orderProcessingTimer: any = undefined;

  constructor(
    private orderService: OrderService,
    public userService: UserService,
    public router: Router,
    private signal: SignalService,
    private modal: SimpleModalService,
    private utilityService: UtilityService
  ) { }

  ngOnInit() {
    this.user = this.userService.getLoggedUserLocalSync();
    this.consolidatedOrder = this.orderService.getSelectedConsolidatedOrderLocal(); // compressed consolidated order
    this.loadOrder();
  }

  ngAfterViewInit() {
    var animation = (window as any).lottie.loadAnimation({
      container: document.getElementById('bm'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '../../../assets/lottie-loader/data.json'
    })
  }

  isNotPaid() {
    if (this.consolidatedOrder?.state === ORDER_STATE.NEW
      || this.consolidatedOrder?.state === ORDER_STATE.CANCELLED) {
      return true;
    }
    return false;
  }

  paymentInit() {
    try {
      this.isProcessing = true;
      window.location.href = this.consolidatedOrder?.consolidatedPaymentUrl;
      // window.open(this.consolidatedOrder?.consolidatedPaymentUrl, "_blank");
      // this.orderProcessingTimer = setInterval(this.validatePayment, 5000, this); 
    } catch (error) {
      console.log(error);
    }
  }

  // validatePayment(_this: any){
  //   _this.orderService.verifyOrderPayment(_this.consolidatedOrder?.id, 'stripe')?.subscribe(status => {
  //     if(status) {
  //       _this.isProcessing = false;
  //       setTimeout(() => {
  //       window.location.reload();
  //       clearInterval(_this.orderProcessingTimer);
  //       }, 4000);
  //     }
  //   })
  // }

  loadOrder() {
    this.orderService.getConsolidatedOrderById(this.consolidatedOrder?.id)?.subscribe(consOrder => {
      this.consolidatedOrder = consOrder;
    });
  }

  
}
