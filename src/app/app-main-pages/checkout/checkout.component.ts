import { ConsolidatedOrder } from './../../models/Order';
import { MY_ACTION, SignalService } from 'src/app/shared/services/signal.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { Cart, Order, User, ORDER_STATE, PaymentGateway, Address } from 'src/app/models';
import { CreateDeliveryAddressComponent } from './../../ui-components/create-delivery-address/create-delivery-address.component';
import { Urls } from 'src/app/config';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { UserService } from 'src/app/shared/services';
import { OrderService } from 'src/app/shared/services/order.service';
import { StoreService } from 'src/app/shared/services/store.service';
import { AddressComponent } from 'src/app/ui-components/address/address.component';
import { Tax } from 'src/app/models/tax.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, AfterViewInit {

  @ViewChild(CreateDeliveryAddressComponent) deliveryAddress: CreateDeliveryAddressComponent;
  @ViewChild(AddressComponent) address: AddressComponent;
  loggedUser: User;

  cart: Cart;
  totalShipCost = 0;
  totalCash = 0;

  consolidatedOrder: ConsolidatedOrder;

  paymentGateWays: PaymentGateway[] = [];
  selectedMethod: PaymentGateway;
  showLoader = false;

  next = 0
  pageNumber =0;

  tax: Tax = new Tax();

  
  constructor(
    private router: Router,
    private cartService: CartService,
    private orderService: OrderService,
    private signal: SignalService,
    private userService: UserService,
    private storeService: StoreService,

  ) {
    this.loggedUser = this.userService.getLoggedUserLocalSync();
    this.getUserTax();
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
      } else if(action == MY_ACTION.address_changed){
        this.next = this.pageNumber; // trigge page movement
      }
    })
  }

  init() {
    this.cart = this.cartService.getCartLocal();
    this.calculateShipping();
    this.totalCash = this.cartService.getTotalAmount();
  }


  getUserTax(address: Address=null){
    if(!address){
    if(this.loggedUser?.address){
      this.storeService.getTax(this.loggedUser?.address?.country, this.loggedUser?.address?.state)?.subscribe(tx => {
        this.tax=tx;
      });
    }} else {
      this.storeService.getTax(address?.country, address?.state)?.subscribe(tx => {
        this.tax=tx;
      });
    }
  }

  showForm(pageNumber: number){
    // save the current form 
    this.pageNumber = pageNumber;
    // Navigation
    if (pageNumber == 1) {
      //save billing details
      this.address?.onSaveAddress();
      // if(!this.address?.address?.id){
      //   return;
      // }
    } else if (pageNumber == 0) {
      // handled by place order button
      this.next = pageNumber;
    }

    

  }


  async placeOrder() {
    this.showLoader = true;
    // if(!this.selectedMethod){
    //   alert("Please select payment method");
    //   this.showLoader = false;
    //   return;
    // }
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

  set addressChangeWatch(t: Address){
    if(!this.tax)
      this.getUserTax(t);
  }

}
