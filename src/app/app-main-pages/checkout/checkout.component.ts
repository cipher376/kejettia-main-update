import { ConsolidatedOrder } from './../../models/Order';
import { MY_ACTION, SignalService } from 'src/app/shared/services/signal.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { Cart, Order, User, ORDER_STATE } from 'src/app/models';
import { CreateDeliveryAddressComponent } from './../../ui-components/create-delivery-address/create-delivery-address.component';
import { Urls } from 'src/app/config';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { UserService } from 'src/app/shared/services';
import { OrderService } from 'src/app/shared/services/order.service';

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

  constructor(
    private router: Router,
    private cartService: CartService,
    private orderService: OrderService,
    private signal: SignalService,
    private userService: UserService
  ) {
    this.loggedUser = this.userService.getLoggedUserLocalSync();
  }


  ngAfterViewInit() {
    this.init();

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

  placeOrder() {
    this.deliveryAddress.saveDeliveryAddress()?.then(value => {
      if (value) {
        // save order object
        //
        this.consolidatedOrder = new ConsolidatedOrder();
        this.consolidatedOrder.userId = this.loggedUser?.id;
        this.consolidatedOrder.deliveryAddressId = this.deliveryAddress?.selectedDeliveryAddress?.id;
        this.consolidatedOrder.userId = this.loggedUser?.id;
        this.consolidatedOrder.currency = 'GHC';
        this.consolidatedOrder.state  = ORDER_STATE.NEW;

        this.orderService.createConsolidatedOrder(this.loggedUser?.id, this.consolidatedOrder).subscribe((consOrder) => {
          this.consolidatedOrder = consOrder;
          // reload the cart
          this.router.navigateByUrl(Urls.order);
        })
      }
    })
  }

  calculateShipping() {
    this.totalShipCost = CartService.calculateShipping(this.cart);
  }

}
