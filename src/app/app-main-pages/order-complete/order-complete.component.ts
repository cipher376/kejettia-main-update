import { StoreService } from './../../shared/services/store.service';
import { UtilityService } from './../../shared/services/utility.service';
import { Cart, CartItem } from './../../models/cart';
import { ConsolidatedOrder, Product, User } from 'src/app/models';
import { OrderService } from './../../shared/services/order.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { Order } from './../../models/Order';
import { Urls } from 'src/app/config';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';
import { UserService } from 'src/app/shared/services';

@Component({
  selector: 'app-order-complete',
  templateUrl: './order-complete.component.html',
  styleUrls: ['./order-complete.component.scss']
})
export class OrderCompleteComponent implements OnInit, AfterViewInit {
  loggedUser: User;
  consolidatedOrder: ConsolidatedOrder;
  items: CartItem[] = [];
  deliveryCost = 0;
  subtotal = 0;

  constructor(
    // private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private cartService: CartService,
    private orderService: OrderService
  ) { }


  ngAfterViewInit(): void {
    this.consolidatedOrder = this.orderService.getSelectedConsolidatedOrderLocal();
    this.loadItems();

  }

  ngOnInit(): void {
  }

  back() {
    // this.location.back()
    this.router.navigateByUrl(Urls.search + ';cart=all')
  }

  loadItems() {
    this.items = [];
    this.subtotal = 0;
    this.deliveryCost = 0;

    this.consolidatedOrder?.orders?.forEach(order => {
      this.subtotal += order?.total;
      this.items.push(...order.cartItems)
    })
    const cart = new Cart();
    cart.cartItems = this.items;
    this.deliveryCost = CartService.calculateShipping(cart);
  }

  getPhoto(product: Product){
    return StoreService.getPhotoUrlByDisplayTypeLocal(product?.photos, 'cover', true, true);
  }




}
