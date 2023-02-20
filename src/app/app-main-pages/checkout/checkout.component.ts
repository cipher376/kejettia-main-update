import { ConsolidatedOrder } from './../../models/Order';
import { MY_ACTION, SignalService } from 'src/app/shared/services/signal.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { Cart, Order, User, ORDER_STATE, PaymentGateway } from 'src/app/models';
import { CreateDeliveryAddressComponent } from './../../ui-components/create-delivery-address/create-delivery-address.component';
import { Urls } from 'src/app/config';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { UserService } from 'src/app/shared/services';
import { OrderService } from 'src/app/shared/services/order.service';
import { StoreService } from 'src/app/shared/services/store.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, AfterViewInit {

  @ViewChild(CreateDeliveryAddressComponent) deliveryAddress: CreateDeliveryAddressComponent;
  loggedUser: User;

  cart: Cart;
  totalShipCost = 0;
  totalCash = 0;

  consolidatedOrder: ConsolidatedOrder;

  paymentGateWays: PaymentGateway[] = [];
  selectedMethod: PaymentGateway;
  showLoader = false;

  constructor(
    private router: Router,
    private cartService: CartService,
    private orderService: OrderService,
    private signal: SignalService,
    private userService: UserService,
    private storeService: StoreService
  ) {
    this.loggedUser = this.userService.getLoggedUserLocalSync();
  }


  ngAfterViewInit() {
    this.init();
    this.getPaymentGateWays();

  }

  ngOnInit() {
    this.init();
    this.signal._action$.subscribe(action => {
      if ((action === MY_ACTION.cartChanged) || (action === MY_ACTION.cartLoaded)) {
        this.cart = this.cartService.getCartLocal();
        this.init();
      }
    })
  }

  init() {
    this.cart = this.cartService.getCartLocal();
    this.calculateShipping();
    this.totalCash = this.cartService.getTotalAmount();
  }

  async placeOrder() {
    this.showLoader = true;
    if(!this.selectedMethod){
      alert("Please select payment method");
      this.showLoader = false;

      return;
    }
    if(this.cart?.cartItems?.length<=0){
    this.showLoader = false;
    return;
    }

    

    const value = await this.deliveryAddress.saveDeliveryAddress();
    if(!this.deliveryAddress?.selectedDeliveryAddress?.id){
      console.log(value);
      this.showLoader = false;
    }
    if (value) {
      // save order object
      // //
      this.consolidatedOrder = new ConsolidatedOrder();
      this.consolidatedOrder.userId = this.loggedUser?.id;
      this.consolidatedOrder.deliveryAddressId = this.deliveryAddress?.selectedDeliveryAddress?.id;
      this.consolidatedOrder.userId = this.loggedUser?.id;
      this.consolidatedOrder.currency = 'CAD';
      this.consolidatedOrder.state = ORDER_STATE.NEW;
      this.consolidatedOrder.paymentGatewayId = this.selectedMethod.id;

      console.log(this.consolidatedOrder);

      this.orderService.createConsolidatedOrder(this.loggedUser?.id, this.consolidatedOrder).subscribe((consOrder) => {
        this.consolidatedOrder = consOrder;

        // reload the cart
        this.router.navigateByUrl(Urls.order);
        this.showLoader = false;
      })
    } 
  }

  calculateShipping() {
    this.totalShipCost = CartService.calculateShipping(this.cart);
  }

  getPaymentGateWays() {
    let storeIds = [];
    this.cart?.cartItems.forEach(item => {
      let id = item?.product?.storeId;
      if(!storeIds.includes(id))
        storeIds.push(id);
    })
    this.storeService.getPaymentGateWays(storeIds).subscribe(gateWays=> {
      this.paymentGateWays = gateWays
      if(gateWays?.length>0)
      this.selectedMethod = gateWays[0]
    })
  }

  set PaymentGateWay(gateway: PaymentGateway){
    console.log(gateway);
    this.selectedMethod = gateway;
  }

  get PaymentGateWay(){
    return this.selectedMethod;
  }

}
