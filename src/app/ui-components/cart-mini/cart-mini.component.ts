import { UtilityService } from './../../shared/services/utility.service';
import { NO_IMAGE } from './../../config';
import { StoreService } from 'src/app/shared/services/store.service';
import { MY_ACTION, SignalService } from 'src/app/shared/services/signal.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { Router } from '@angular/router';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Urls } from 'src/app/config';
import { Cart, CartItem, Product, User } from 'src/app/models';
import { UserService } from 'src/app/shared/services';

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

  inStock:boolean[] = [];

  constructor(
    private router: Router,
    private cartService: CartService,
    private signal: SignalService,
    private storeService: StoreService,
    private userService: UserService
  ) {
    Window = window;
  }


  ngAfterViewInit(): void {
    

  }

  ngOnInit(): void {
    this.init();
    this.loggedUser = this.userService.getLoggedUserLocalSync();
    
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
    console.log(this.cart);
    this.inStock= [];
    this.totalCash = this.cartService.getTotalAmount();
    // console.log(this.cart);
  }

  goToCart() {
    console.log(this.cart);
    this.router.navigateByUrl(Urls.cart)
  }

  goToCheckOut() {
    if(this.inStock?.includes(false)){
      alert('Some items are out of stock, please review your items'); 
      return;
    }
    if (this.loggedUser) {
      this.router.navigateByUrl(Urls.checkout);
    } else {
      this.router.navigateByUrl(Urls.login);
    }
  }

  goToProduct(product: Product) {
    console.log('here')
    this.storeService.setSelectedProductLocal(product).then(() => {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([Urls.productDetails + '/' + product?.id]);
      });
      // window.location.href = Urls.productDetails + '/' + product?.id;
      
    });

    // this.storeService.setSelectedProductLocal(product).then(() => {
    //   this.router.navigateByUrl(Urls.productDetails + '/' + product?.id);
    //   // window.location.href = Urls.productDetails + '/' + product?.id;
    // });
  }

  getProductPhoto(product: Product) {
    return StoreService.getPhotoUrlByDisplayTypeLocal(product?.photos, 'cover', true, true);
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
