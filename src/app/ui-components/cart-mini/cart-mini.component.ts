import { UtilityService } from './../../shared/services/utility.service';
import { NO_IMAGE } from './../../config';
import { StoreService } from 'src/app/shared/services/store.service';
import { MY_ACTION, SignalService } from 'src/app/shared/services/signal.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { Router } from '@angular/router';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Urls } from 'src/app/config';
import { Cart, CartItem, Product } from 'src/app/models';

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

  constructor(
    private router: Router,
    private cartService: CartService,
    private signal: SignalService,
    private storeService: StoreService
  ) {
    Window = window;
  }


  ngAfterViewInit(): void {
    this.init();

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
    console.log(this.cart);
  }

  goToCart() {
    this.router.navigateByUrl(Urls.cart)
  }

  goToCheckOut() {
    this.router.navigateByUrl(Urls.checkout)
  }

  goToProduct(product: Product) {
    console.log('here')
    this.storeService.setSelectedProductLocal(product).then(() => {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([Urls.productDetails + '/' + product?.id]);
      });
    });
  }

  getProductPhoto(product: Product) {
    return StoreService.getPhotoUrlByDisplayTypeLocal(product?.photos, 'cover', true, true);
  }

  deleteFromCart(cartItem: CartItem) {
    this.cartService.deleteCartItem(this.cart?.id, cartItem?.id).subscribe(() => {
      console.log(this.cart?.cartItems);
      // this.cart.cartItems = UtilityService.arrayRemove(this.cart.cartItems, cartItem);
      this.cart = this.cartService.getCartLocal();
    })
  }


}
