import { UtilityService } from './../../shared/services/utility.service';
import { NO_IMAGE } from './../../config';
import { StoreService } from 'src/app/shared/services/store.service';
import { MY_ACTION, SignalService } from 'src/app/shared/services/signal.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { Router } from '@angular/router';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Urls } from 'src/app/config';
import { Cart, CartItem, User } from 'src/app/models';
import { UserService } from 'src/app/shared/services';
import { WcProduct } from 'src/app/models/woocommerce.model';
import { WooCommerceStoreService } from 'src/app/shared/services/wc-store.service';

declare var $: any;
declare var Window: any;

@Component({
  selector: 'app-cart-mini',
  templateUrl: './cart-mini.component.html',
  styleUrls: ['./cart-mini.component.scss']
})
export class CartMiniComponent implements OnInit, AfterViewInit {
  private cart: Cart
  totalCash: number = 0; // total cash

  private loggedUser: User;
  constructor(
    private router: Router,
    private cartService: CartService,
    private signal: SignalService,
    private storeService: StoreService,
    private wcStoreService: WooCommerceStoreService,
    private userService: UserService
  ) {
    Window = window;
  }


  ngAfterViewInit(): void {
    this.init();
    this.loggedUser = this.userService.getLoggedUserLocalSync();

  }

  ngOnInit(): void {
    this.signal._action$.subscribe(action => {
      if ((action === MY_ACTION.cartChanged) || (action === MY_ACTION.cartLoaded)) {
        this.init();
      }
    })
  }

  get Cart() {
    return this.cart;
  }

  init() {
    this.cart = this.cartService.getCartLocal();
    this.totalCash = this.cartService.getTotalAmount();
    // console.log(this.cart);
  }

  goToCart() {
    console.log(this.cart);
    this.router.navigateByUrl(Urls.cart)
  }

  goToCheckOut() {
    if (this.loggedUser) {
      this.router.navigateByUrl(Urls.checkout);
    } else {
      this.router.navigateByUrl(Urls.login);
    }
  }

  goToProduct(product: WcProduct) {
    console.log('here')
    this.wcStoreService.setSelectedProductLocal(product).then(() => {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([Urls.productDetails + '/' + product?.id]);
      });
    });
  }

  getProductPhoto(product: WcProduct) {
    return StoreService.getPhotoUrlByDisplayTypeLocal(product?.images, 'cover', true, true);
  }

  deleteFromCart(cartItem: CartItem) {
    const sub = this.cartService.deleteCartItem(this.cart?.id, cartItem?.id);
    if (sub) {
      sub.subscribe(() => {
        this.cart = this.cartService.getCartLocal();
      })
    } else {
      this.cart = this.cartService.getCartLocal();
    }
  }


}
