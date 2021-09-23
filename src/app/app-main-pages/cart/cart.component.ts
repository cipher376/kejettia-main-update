import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Urls } from 'src/app/config';
import { Cart, Product, CartItem, Address, User } from 'src/app/models';
import { CartService } from 'src/app/shared/services/cart.service';
import { SignalService, MY_ACTION } from 'src/app/shared/services/signal.service';
import { StoreService } from 'src/app/shared/services/store.service';
import { Location } from '@angular/common';
import { UtilityService, UserService } from 'src/app/shared/services';
import { IOption } from 'ng-select';


declare var $: any;
declare var Window: any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  selectedUser: User;

  private city: string;

  private cart: Cart
  totalCash: number = 0; // total cash
  totalShipCost: number = 0;

  public cities: Array<IOption> = [];

  constructor(
    private router: Router,
    private cartService: CartService,
    private signal: SignalService,
    private storeService: StoreService,
    private location: Location,
    private util: UtilityService,
    private userService: UserService
  ) {
    Window = window;

    this.util.getSelectedCities().forEach(city => {
      this.cities.push(
        {
          value: city,
          label: city,
          disabled: false
        }
      )
    })
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

  set SelectedCity(city: string) {
    this.city = city;

    // calculate shipping
    if (this.cart)
      this.calculateShipping();
  }
  get SelectedCity() {
    return this.city;
  }

  init() {
    this.selectedUser = this.userService.getLoggedUserLocalSync();
    // get user delivery address;

    this.cart = this.cartService.getCartLocal();
    // console.log(this.cart);
    this.calculateShipping();
    this.totalCash = this.cartService.getTotalAmount();
  }


  goToCart() {
    this.router.navigateByUrl(Urls.login);
  }

  goToCheckOut() {
    if (this.selectedUser) {
      this.cartService.setCartLocal(this.cart);
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
    });
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



  increaseQuantity(item: CartItem) {
    if (item?.product?.stockCount > 0) {
      item.quantity += 1
      item.product.stockCount -= 1;
      this.updateCartItem(item);
    }
  }

  decreaseQuantity(item: CartItem) {
    if (item?.quantity > 1) {
      item.quantity -= 1;
      item.product.stockCount += 1;
      this.updateCartItem(item);
    }
  }


  updateCartItem(item: CartItem) {
    this.cartService.addUpdateCartItemToCart(this.cart?.id, item?.product?.id, item?.quantity,
      item?.shippingId ?? item?.shipping?.id).subscribe(() => {
        this.totalCash = this.cartService.getTotalAmount();
      });
  }

  goBack() {
    this.location.back();
  }


  calculateShipping() {
    this.totalShipCost = CartService.calculateShipping(this.cart);
    // console.log(this.totalShipCost)
  }
}
