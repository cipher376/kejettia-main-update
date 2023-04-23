import { StoreService } from './../../shared/services/store.service';
import { UtilityService } from './../../shared/services/utility.service';
import { Cart, CartItem } from './../../models/cart';
import { Address, ConsolidatedOrder, Product, User } from 'src/app/models';
import { OrderService } from './../../shared/services/order.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { Order } from './../../models/Order';
import { Urls } from 'src/app/config';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { UserService } from 'src/app/shared/services';
import { Tax } from 'src/app/models/tax.model';

@Component({
  selector: 'app-order-complete',
  templateUrl: './order-complete.component.html',
  styleUrls: ['./order-complete.component.scss']
})
export class OrderCompleteComponent implements OnInit, AfterViewInit, OnDestroy {
  loggedUser: User;
  consolidatedOrder: ConsolidatedOrder;
  items: CartItem[] = [];
  deliveryCost = 0;
  subtotal = 0;
  tax:Tax = new Tax();
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private cartService: CartService,
    private orderService: OrderService,
    private utilityService: UtilityService, 
    private storeService: StoreService,
    private userService: UserService
  
  ) { }


  ngOnDestroy(): void {
    this.consolidatedOrder.deliveryAddress.email = null;
    this.orderService.setSelectedConsolidatedOrderLocal(this.consolidatedOrder);
  }


  ngAfterViewInit(): void {
    
    // console.log(this.consolidatedOrder);
    this.loadOrder();

    this.route?.queryParams.subscribe(param => {
      // console.log(param);
      this.verifyPayment(param);
    })
  }

  ngOnInit(): void {
    this.loggedUser = this.userService.getLoggedUserLocalSync();

    this.consolidatedOrder = this.orderService.getSelectedConsolidatedOrderLocal();
    this.loadItems();

    if (!this.consolidatedOrder?.deliveryAddress?.email) {
      this.orderService.getConsolidatedOrderById(this.consolidatedOrder?.id).subscribe(order => {
        this.utilityService.reload();
        console.log(order);
      });
    }

    this.getUserTax();
  }

  loadOrder() {
    this.orderService.getConsolidatedOrderById(this.consolidatedOrder?.id)?.subscribe(consOrder => {
      this.consolidatedOrder = consOrder;
      this.loadItems();
    });
  }

  back() {
    // this.location.back()
    this.utilityService.setSearchKey('all')
    this.router.navigate([Urls.search])
  }

  loadItems() {
    this.items = [];
    this.subtotal = 0;
    this.deliveryCost = 0;

    this.consolidatedOrder?.orders?.forEach(order => {
      // this.subtotal += order?.total;
      if (order?.cartItems)
        this.items.push(...order.cartItems)
      // console.log(this.subtotal);
      // console.log(order)
    })
    const cart = new Cart();
    cart.cartItems = this.items;
    console.log(cart);
    this.subtotal = this.cartService.getTotalAmount(cart);
    this.deliveryCost = CartService.calculateShipping(cart);
    console.log(this.deliveryCost);
  }

  getPhoto(product: Product) {
    return StoreService.getPhotoUrlByDisplayTypeLocal(product?.photos, 'cover', true, true);
  }
  
  verifyPayment(param: object){
    // console.log(payment_ssid);
    // TODO: 
    const keys = Object.keys(param)
    if(keys?.length>0){
      // const cons_id = keys[0].split("_")[0];
      const cons_id = keys[0];
      console.log(cons_id);

      this.orderService.verifyOrderPayment(cons_id, param[cons_id], 'stripe').subscribe(status => {
        console.log(status);
        if(status){
          // window.close();
          console.log(status);
        }
      })
    }
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




}
