import { Shipping } from './../../models/shipping';
import { Urls } from 'src/app/config';
import { Location } from '@angular/common';
import { environment } from './../../../environments/environment';
import { Photo } from './../../models/photo';
import { MY_ACTION, SignalService } from './../../shared/services/signal.service';
import { StoreService } from 'src/app/shared/services/store.service';
import { CartService } from './../../shared/services/cart.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, AfterViewInit, Input, ElementRef, ViewChild } from '@angular/core';
import { Cart, CartItem, Product, Features, Review, User } from 'src/app/models';
import { Subscription } from 'rxjs';
import { UserService, UtilityService } from 'src/app/shared/services';

declare var $: any;
declare var Window: any;
@Component({
  selector: 'app-product-details-custom',
  templateUrl: './product-details-custom.component.html',
  styleUrls: ['./product-details-custom.component.scss']
})
export class ProductDetailsCustomComponent implements OnInit, AfterViewInit {
  loggedUser: User;


  selectedProduct: Product;
  selectedProductId = '';
  selectedProductPhotos: Photo[] = [];
  products: Product[] = [];
  productReviews: Review[] = [];

  quantity = 0;
  cartItem?: CartItem;
  cart?: Cart;

  tab = 1; // UI

  addToCart$?: Subscription;
  addedToCart = false;

  sizeFeatures: Features[] = [];
  colorFeatures: Features[] = [];
  selectedFeatures: Features[] = [];
  otherFeatures: Features[] = [];

  guide = '';

  selectedShippingCost: number = 0;
  selectedShipping: Shipping;

  @ViewChild('zoomImage') zoomImage: ElementRef<HTMLInputElement>;
  // data-zoom-image="{{ph?.source}}"

  sizeGuidePhoto = '';
  colorGuidePhoto = '';

  wishList: Product[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cartService: CartService,
    private storeService: StoreService,
    private userService: UserService,
    private signal: SignalService,
    private location: Location
  ) {
    Window = window;
    // added to cart
    route.params.subscribe(p => {
      this.selectedProductId = p?.id;
    })
  }

  @Input() set Product(product) {
    this.selectedProduct = product;
    this.refreshProduct();
  }

  get Product() {
    return this.selectedProduct;
  }

  set SelectedFeature(feature: Features) {
    let found = false;
    this.selectedFeatures.forEach((f, index) => {
      if (feature?.name == f?.name) {
        // replace the p
        this.selectedFeatures[index] = feature;
        found = true;
      }
    });
    if (!found) {
      // feature does not exist
      this.selectedFeatures.push(feature);
    }
  }

  ngAfterViewInit(): void {
    // this.Product = this.storeService.getSelectedProductLocalSync();
    this.wishList = this.storeService.getWishListLocalSync();
    this.isInWishList();

    console.log(this.wishList)

    if (this.selectedProduct) {
      setTimeout(() => {
        this.getCartItemFromCart();
      }, 100);
    }
    this.cart = this.cartService.getCartLocal();
    this.products = this.storeService.getProductsLocalSync();

    window.scrollTo(0, 10);

  }

  ngOnInit(): void {
    this.loggedUser = this.userService.getLoggedUserLocalSync();
    this.signal._action$.subscribe(action => {
      if (action === MY_ACTION.wish_list_changed) {
        this.wishList = this.storeService.getWishListLocalSync();
        this.isInWishList();
      }
    })
    this.Product = this.storeService.getSelectedProductLocalSync();
    this.signal._action$.subscribe(action => {
      if (action === MY_ACTION.cartChanged) {
        this.cart = this.cartService.getCartLocal();
      }
      if (action === MY_ACTION.loadReviews) {
        this.loadReviews();
      }
    });
  }

  init() {
    this.getFeatures();
    this.loadPhotos();
    this.loadReviews();
    this.getCartItemFromCart();
    this.getColorGuidePhotoUrl();
    this.getSizeGuidePhotoUrl();
  }

  addToCart() {
    console.log(this.selectedShipping)
    if ((this.selectedProduct?.shippings?.length) > 0 && (!this.selectedShipping)) {
      alert("Please select shipping or delivery location");
      return;
    }

    this.addToCart$ = this.cartService.addUpdateCartItemToCart(this.cart?.id, this.selectedProduct?.id, this.quantity, this.selectedShipping?.id)?.subscribe(cartItem => {
      this.selectedFeatures?.forEach(feature => {
        this.cartService.updateCartItemToFeature(this.cartItem?.id, feature?.id).subscribe(() => {

        })
      })
      this.showAddedToCartAlert();
      // this.cartService.getCart().subscribe(()=>{})
    })
  }



  addToWishList() {
    if(!this.loggedUser){
      alert('Please login to add to your wishlist')
      return;
    }
    if (!this.isInWishList()) {
      this.storeService.addProductToWhishlist(this.selectedProduct?.id, this.loggedUser?.id).subscribe(() => {
        this.storeService.getUserWishList(this.loggedUser?.id).subscribe(products => {
          this.wishList = products;
        });
      })
    }
  }

  addToCompare() {
    if (!this.isInCompare()) {
      //TODO: add to compare
    }
    this.router.navigateByUrl(Urls.compare)
  }

  get Quantity() {
    return this.quantity;
  }

  set Quantity(quantity: number) {
    this.quantity = quantity;
  }

  increaseQuantity() {
    if (this.StockCount > 0) {
      this.Quantity += 1
    }
  }

  decreaseQuantity() {
    if (this.Quantity > 0) {
      this.Quantity = (this.Quantity - 1);
    }
  }

  getCartItemFromCart() {
    this.cartItem = this.cartService.getCartItemByProductLocal(this.selectedProduct?.id);
    this.quantity = this.cartItem?.quantity ?? 0;
  }

  refreshProduct() {
    this.storeService.getProductById(this.selectedProductId ?? this.selectedProduct.id).subscribe(product => {
      this.selectedProduct = product;
      this.init();
    });
  }

  getFeatures() {
    this.sizeFeatures = [];
    this.colorFeatures = [];
    this.otherFeatures = [];
    this.selectedProduct?.features?.forEach(f => {
      if (f.name.search('size')) {
        this.sizeFeatures.push(f);
      } else if (f.name.search('color')) {
        this.colorFeatures.push(f);
      } else {
        this.otherFeatures.push(f);
      }
    });
  }

  loadPhotos() {
    this.selectedProductPhotos = [];
    this.selectedProduct?.photos?.forEach(p => {
      const ph = new Photo();
      ph.source = environment.file_api_download_url_root + p.source;
      ph.thumbnail = environment.file_api_download_url_root + p.thumbnail;
      this.selectedProductPhotos.push(ph);
      return ph;
    });
  }


  //UI
  goToTab(index: number) {
    this.tab = index;
    window.scrollTo(0, 500);
  }

  setGuidWidget(guide: string) {
    if (guide === 'shipping') {
      this.tab = 5
    } else {
      this.tab = 3;
    }
    this.guide = guide;
    window.scrollTo(0, 500);
  }

  goBack() {
    this.location.back();
  }

  goPrev() {
    this.products = this.storeService.getProductsLocalSync();
    const prev = this.Prev;
    if (prev) {
      this.storeService.setSelectedProductLocal(prev).then(() => {
        // refresh page;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([Urls.productDetails + '/' + this.Prev?.id]);
        });
        // window.location.href = Urls.productDetails
      })
    } else {
      this.location.back();
    }
  }

  goNext() {
    this.products = this.storeService.getProductsLocalSync();
    const next = this.Next;
    console.log(next);
    if (next)
      this.storeService.setSelectedProductLocal(next).then(() => {
        // refresh page;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([Urls.productDetails + '/' + this.Next?.id]);
        });
        // window.location.href = Urls.productDetails
      })
  }

  get Next() {
    let found = (UtilityService.searchObjFromArrray(this.selectedProduct?.id, this.products));
    let index = found ? found[1] : 0;
    if (index && (index < this.products.length)) {
      return this.products[index + 1];
    }
    return undefined
  }

  get Prev() {
    let found = (UtilityService.searchObjFromArrray(this.selectedProduct?.id, this.products));
    let index = found ? found[1] : ((this.products.length??0) - 1);
    if (index && (index > 0)) {
      return this.products[index - 1];
    }
    return undefined
  }

  getPhotoUrl(photos: Photo[]) {
    // console.log(photos);
    return StoreService.getPhotoUrlByDisplayTypeLocal(photos, 'cover', true, true);
  }

  getSizeGuidePhotoUrl() {
    this.sizeGuidePhoto = StoreService.getPhotoUrlByDisplayTypeLocal(this.selectedProduct?.photos, 'size-guide') || 'assets/images/product/size_guide.png';
  }

  getColorGuidePhotoUrl() {
    this.colorGuidePhoto = StoreService.getPhotoUrlByDisplayTypeLocal(this.selectedProduct?.photos, 'color-guide');
  }


  calculateRating() {
    return StoreService.getProductRating(this.selectedProduct);
  }

  isInWishList() {
    if (UtilityService.ObjInArray(this.wishList, this.selectedProduct, 'id')) {
      $('.product-single .btn-wishlist').removeClass('load-more-overlay loading')
        .html('<i class="d-icon-heart-full" style="color:#ed1d25"></i> Browse wishlist')
        .addClass('added')
        .attr('title', 'Browse wishlist')
        // .attr('href', '/main/pages/wishlist');
      console.log(true)
      return true
    } else {

      return false;
    }
  }

  isInCompare() {
    // TODO:
    if (true) {
      return true
    } else {
      return false;
    }
  }

  get StockCount() {
    const currentStock = (this.selectedProduct?.stockCount - this.quantity)
    return currentStock;
  }

  loadReviews() {
    this.storeService.getProductReviews(this.selectedProduct?.id).subscribe(reviews => {
      // console.log(reviews);
      this.productReviews = reviews;
    });
  }

  getVideo() {
    if (this.selectedProduct?.videos?.length > 0)
      return this.selectedProduct?.videos[0];
    return undefined;
  }



  // UI function
  showAddedToCartAlert() {
    var $product = $('.single-product .btn-cart:not(.disabled)').closest('.product-single');
    $('.cart-added-alert').remove();
    $(Window.Riode.parseTemplate(Window.Riode.defaults.templateCartAddedAlert, {
      name: $product.find('h1.product-name').text()
    }))
      .insertBefore($product).fadeIn();
    $('.sticky-sidebar').trigger('recalc.pin');
  }
}

