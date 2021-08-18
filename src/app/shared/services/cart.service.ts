import { ConsolidatedOrder } from './../../models/Order';
import { UtilityService } from './utility.service';
import { StoreService } from 'src/app/shared/services/store.service';
import { MY_ACTION, SignalService } from './signal.service';
import { UserService } from './user.service';
import { MyLocalStorageService } from './local-storage.service';
import { Injectable } from "@angular/core";
import { Cart, CartItem, FeaturesToCartItemThrough, Order } from 'src/app/models';
import { throwError, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CartService {


  constructor(
    private fstore: MyLocalStorageService,
    private http: HttpClient,
    private userService: UserService,
    private signal: SignalService,
    private storeService: StoreService
  ) {
    this.initCart();
  }

  static calculateShipping(cart: Cart) {
    let totalShipCost = 0;
    if (cart) {
      cart?.cartItems?.forEach(item => {
        // if (item?.shipping?.shipTo.join(' ').toLocaleLowerCase().search('city') > -1) {
        // user not in the same city as the product
        totalShipCost += (item?.shipping?.flatCharge * item?.quantity);
        // }
      })
    }
    return totalShipCost;
  }

  initCart() {
    this.clearCart();
    const user = this.userService.getLoggedUserLocalSync();
    if (!user?.id) {
      console.error('User is not logged in');
      this.initBrowserCart();
      return;
    }
    try {
      const cart = new Cart();
      cart.userId = user?.id;
      this.createUpdateCart(user?.id, cart).subscribe(newCart => {
        console.info('New cart item created');
        // console.log(newCart);
      })
    } catch (error) {
      console.log();
    }
    this.getCart(user?.id)?.subscribe(cart => {
      // console.log(cart);
    })

  }

  initBrowserCart() {
    const cart = new Cart();
    cart.id = 'kejettia_cart' + UtilityService.generateRandomNumber();
    this.setCartLocal(cart);
  }

  syncCart(browserCart: Cart) {
    // synchronize the browser cart with the server cart
    browserCart.cartItems.forEach(item => {
      this.addUpdateCartItemToCart(item.cartId, item.productId, item.quantity).subscribe(() => { });
    })
  }


  getCart(userId?: any) {
    if (!userId) {
      userId = this.userService.getLoggedUserLocalSync()?.id;
    }
    if (!userId) {
      console.error('User must logged in to load cart');
      return undefined;
    }
    const filter = {
      include: [
        {
          relation: 'cartItems',
          scope: {
            include: [
              {
                relation: 'product',
                scope: {
                  include: [
                    {
                      relation: 'photos'
                    },
                    {
                      relation: 'features'
                    },
                    {
                      relation: 'shippings'
                    }
                  ]
                }
              },
              {
                relation: 'shipping'
              },
              {
                relation: 'features'
              }
            ]
          }
        }
      ]
    }
    const url = `${environment.store_api_root_url}/users/${userId}/cart?filter=${JSON.stringify(filter)}`
    return this.http.get<Cart>(url).pipe(
      map(res => {
        this.setCartLocal(res);
        this.signal.sendAction(MY_ACTION.cartChanged);
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }

  createUpdateCart(userId: any, cart: Cart) {
    if (cart.id) { // perform update
      return this.http.patch<Cart>(environment.store_api_root_url + `/users/${userId}/cart`, cart).pipe(
        map(res => {
          // console.log(res);
          this.setCartLocal(cart);
          return cart as any;
        }),
        catchError(e => this.handleError(e))
      );
    } else {
      return this.http.post<Cart>(environment.store_api_root_url + `/users/${userId}/cart`, cart).pipe(
        map(res => {
          // console.log(res);
          this.setCartLocal(res);
          return res as any;
        }),
        catchError(e => this.handleError(e))
      );
    }
  }

  deleteCartItem(cartId: any, cartItemId: any) {
    return this.http.delete(environment.store_api_root_url + `/carts/${cartId}/cart-items?filter=${JSON.stringify({ id: cartItemId })}`).pipe(
      map(res => {
        this.getCart().subscribe(cart => {
          console.log(cart);
        })
        return res as any;
      }),
      catchError(e => this.handleError(e))
    );
  }

  addUpdateCartItemToCart(cartId: any, productId: any, quantity = 1, shipId?: any) {
    console.log(cartId);
    // if user is not logged in create fake cart
    const user = this.userService.getLoggedUserLocalSync();
    if (!user?.id) {
      console.log('here');
      return of(this.addToBrowserCart(cartId, productId, quantity));
    }

    if (!cartId || !productId) {
      console.error('Invalid cart or product Id');
      if (!cartId) {
        this.initCart();
      }
      return undefined;
    }
    const cartItem: CartItem = {} as any;
    cartItem.cartId = cartId;
    cartItem.productId = productId;
    cartItem.quantity = quantity;
    cartItem.shippingId = shipId;

    return this.http.post<Cart>(environment.store_api_root_url + `/carts/${cartId}/cart-items`, cartItem).pipe(
      map(res => {
        this.getCart().subscribe(cart => {
          console.log(cart);
        })
        return res as any;
      }),
      catchError(e => this.handleError(e))
    );
  }


  linkCartItemToFeature(itemId: any, featureId: any) {
    if (!itemId || !featureId) {
      console.log('Invalid cartItem to feature map ids');
      return undefined;
    }
    const throughItem = { cartItemId: itemId, featuresId: featureId } as FeaturesToCartItemThrough;

    const url = `${environment.store_api_root_url}/features-to-cart-item-throughs`
    return this.http.post<FeaturesToCartItemThrough>(url, throughItem).pipe(
      map(res => {
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }

  unlinkCartItemToFeature(itemId: any, featureId: any) {
    if (!itemId || !featureId) {
      console.log('Invalid cartItem to feature map ids');
      return undefined;
    }
    let filter: any = {
      cartItemId: itemId,
      featuresId: featureId
    }
    filter = '?where=' + JSON.stringify(filter);
    const url = `${environment.store_api_root_url}/features-to-cart-item-throughs${filter}`
    return this.http.delete(url).pipe(
      map(res => {
        return res;
      }),
      catchError(e => this.handleError(e))
    );

  }

  updateCartItemToFeature(itemId: any, featureId: any) {
    if (!itemId || !featureId) {
      console.log('Invalid cartItem to feature map ids');
      return undefined;
    }
    const throughItem = { cartItemId: itemId, featuresId: featureId } as FeaturesToCartItemThrough;
    const url = `${environment.store_api_root_url}/features-to-cart-item-throughs`
    return this.http.put<FeaturesToCartItemThrough>(url, throughItem).pipe(
      map(res => {
        console.log(res);

        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }






  addToBrowserCart(cartId: any, productId: any, quantity = 1) {
    let cart = this.getCartLocal();
    if (!cart.cartItems) {
      cart.cartItems = [];
    }
    const cartItem = this.productExistInBrowserCart(productId) ?? new CartItem();
    cartItem.quantity = quantity;
    if (cartItem.id) {
      // already exist so update the existing cartItem
      cart = this.removeFromBrowserCart(cartId, cartItem?.id);
      cart.cartItems.push(cartItem); // add the updated item;
      this.setCartLocal(cart);
      this.signal.sendAction(MY_ACTION.cartChanged);
    } else {
      // insert new cartItem
      cartItem.cartId = cartId;
      cartItem.productId = productId;
      cartItem.id = 'cart_item' + UtilityService.generateRandomNumber() + UtilityService.generateRandomNumber();
      const sub$ = this.storeService.getProductById(productId).subscribe(product => {
        cartItem.product = product;
        cartItem.price = product.currentPrice;
        if (product?.currentPrice > 0) {
          cart.cartItems.push(cartItem);
          this.setCartLocal(cart);
          this.signal.sendAction(MY_ACTION.cartChanged);
          sub$.unsubscribe();
        }
      })
    }
    return cart;
  }

  productExistInBrowserCart(productId: any, cart?: Cart) {
    if (!cart) {
      cart = this.getCartLocal();
    }
    return cart?.cartItems?.find(item => {
      return item.productId === productId;
    })
  }

  removeFromBrowserCart(cartId: any, cartItemId: any) {
    const cart = this.getCartLocal();
    if (cart?.id === cartId && cart?.cartItems?.length > 0) {
      cart.cartItems = cart?.cartItems.filter((item, index) => {
        if (item.id != cartItemId) {
          return true;
        }
        return false;
      })
    }
    this.setCartLocal(cart); // update on disk
    return cart;
  }

  removeFromCart(cartId: any, cartItemId: any) {
    if (!cartItemId || !cartId) {
      console.log('Item is undefined');
      return undefined;
    }
    const filter = {
      where: {
        id: cartItemId
      }
    }
    const url = `${environment.store_api_root_url}/carts/${cartId}/cart-items?filter=${JSON.stringify(filter)}`
    return this.http.delete(url).pipe(
      map(res => {
        this.getCart()?.subscribe(cart => {
          console.log(cart);
        })
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }

  increaseItemQuantity(cartItem: CartItem) {
    if (cartItem?.quantity) {
      cartItem.quantity += 1;
    } else {
      cartItem.quantity = 1;
    }
  }

  decreaseItemQuantity(cartItem: CartItem) {
    if (cartItem?.quantity && cartItem?.quantity > 1) {
      cartItem.quantity -= 1;
    } else {
      cartItem.quantity = 1;
    }
  }

  getTotalAmount() {
    const cart = this.getCartLocal();
    let total = 0;
    cart?.cartItems?.forEach(item => {
      total += (item.price * item.quantity);
    });
    return total;
  }

  getCartItemByProductLocal(productId: any) {
    const cart = this.getCartLocal();
    return cart?.cartItems?.find(item => {
      if (item.productId === productId) {
        return true;
      }
      return false;
    })
  }

  setCartLocal(cart: Cart) {
    this.fstore.setObjectSync('cart', cart);
  }

  getCartLocal(): Cart {
    return this.fstore.getObjectSync('cart');
  }

  clearCart() {
    this.fstore.remove('cart');
  }


  /////////////////////////////////////////////////////////////////////////
  /*************Local store access*****/
  ///////////////////////////////////////////////////////////////////////////


  handleError(e: any) {
    console.log(e);
    const message = '';
    if (e.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', e.error.message);
      console.log('No connection');
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${e.status}, ` + `body was: ${e.code}`
      );
    }
    // return an observable with a user-facing error message
    return throwError('System error, please report to: admin@kejettia.com');
  }
}
