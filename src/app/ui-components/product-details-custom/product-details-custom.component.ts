import { MY_ACTION, SignalService } from './../../shared/services/signal.service';
import { StoreService } from 'src/app/shared/services/store.service';
import { CartService } from './../../shared/services/cart.service';
import { Router } from '@angular/router';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Cart, CartItem, Product } from 'src/app/models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-details-custom',
  templateUrl: './product-details-custom.component.html',
  styleUrls: ['./product-details-custom.component.scss']
})
export class ProductDetailsCustomComponent implements OnInit, AfterViewInit {
  selectedProduct: Product;
  quantity = 0;
  cartItem?: CartItem;
  cart?: Cart;

  tab = 1; // UI

  addToCart$?: Subscription;

  constructor(
    private router: Router,
    private cartService: CartService,
    private storeService: StoreService,
    private signal: SignalService
  ) { }


  ngAfterViewInit(): void {
    if (this.selectedProduct) {
      setTimeout(() => {
        this.getCartItemFromCart();
      }, 100);
    }
    this.cart = this.cartService.getCartLocal();
  }

  ngOnInit(): void {
    this.selectedProduct = this.storeService.getSelectedProductLocalSync();
    this.signal._action$.subscribe(action => {
      if (action === MY_ACTION.cartChanged) {
        this.cart = this.cartService.getCartLocal();
      }
    })
  }

  addToCart() {
    this.addToCart$ = this.cartService.addUpdateCartItemToCart(this.cart?.id, this.selectedProduct?.id, this.quantity)
      .subscribe(cartItem => {
        console.log(cartItem);
      })
  }

  addToWishList() {

  }

  addToCompare() {

  }

  increaseQuantity() {
    this.quantity += 1
  }

  decreaseQuantity() {
    if (this.quantity > 0) {
      this.quantity = (this.quantity - 1);
    }
  }

  getCartItemFromCart() {
    this.cartItem = this.cartService.getCartItemByProductLocal(this.selectedProduct?.id);
    this.quantity = this.cartItem?.quantity ?? 0;
  }


  //UI
  goToTab(index: number) {
    this.tab = index;
  }
}
