import { Cart, CartItem, Features, Photo, Review, Shipping, User } from 'src/app/models';
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Urls } from 'src/app/config';
import { CartService } from 'src/app/shared/services/cart.service';
import { SignalService, MY_ACTION } from 'src/app/shared/services/signal.service';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
import { UserService, UtilityService } from 'src/app/shared/services';
import { ProductShippingClass, WcCustomerShipping, WcProduct, WcProductReview } from 'src/app/models/woocommerce.model';
import { WooCommerceStoreService } from 'src/app/shared/services/wc-store.service';
import { StoreService } from 'src/app/shared/services/store.service';


declare var $: any;
declare var Window: any;
@Component({
  selector: 'app-product-details-simple',
  templateUrl: './product-details-simple.component.html',
  styleUrls: ['./product-details-simple.component.scss']
})
export class ProductDetailsSimpleComponent implements OnInit, AfterViewInit {

  loggedUser: User;


  selectedProduct: WcProduct;
  selectedProductPhotos: any[] = [];
  products: WcProduct[] = [];
  productReviews: WcProductReview[] = [];

  quantity = 0;
  cartItem?: CartItem;
  cart?: Cart;

  tab = 1; // UI

  addToCart$?: Subscription;
  addedToCart = false;

  sizeFeatures: Features[] = [];
  selectedFeatures: Features[] = [];
  colorFeatures: Features[] = [];
  otherFeatures: Features[] = [];

  guide = '';

  @ViewChild('zoomImage') zoomImage: ElementRef<HTMLInputElement>;
  // data-zoom-image="{{ph?.source}}"

  sizeGuidePhoto = '';
  colorGuidePhoto = '';

  selectedShippingCost: number = 0;
  selectedShipping: ProductShippingClass;
  shippings: ProductShippingClass[]=[];

  selectedProductId = '';

  wishList: WcProduct[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cartService: CartService,
    private storeService: StoreService,
    private wcStoreService: WooCommerceStoreService,
    private userService: UserService,
    private signal: SignalService,
    private location: Location
  ) {
    Window = window;
    route.params.subscribe(p => {
      this.selectedProductId = p?.id;
      this.refreshProduct();
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
    // this.WcProduct = this.wcStoreService.getSelectedProductLocalSync();
    this.wishList = this.wcStoreService.getWishListLocalSync();
    this.isInWishList();

    console.log(this.wishList)
    if (this.selectedProduct) {
      setTimeout(() => {
        this.getCartItemFromCart();
      }, 100);
    }
    this.cart = this.cartService.getCartLocal();
    this.products = this.wcStoreService.getProductsLocalSync();

    window.scrollTo(0, 10);
    this.loadPhotos();


  }

  ngOnInit(): void {
    this.loggedUser = this.userService.getLoggedUserLocalSync();

    this.signal._action$.subscribe(action => {
      if (action === MY_ACTION.wish_list_changed) {
        this.wishList = this.wcStoreService.getWishListLocalSync();
        this.isInWishList();
      }
    })

    this.Product = this.wcStoreService.getSelectedProductLocalSync();
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
    this.getShipping();
    this.getFeatures();
    this.loadReviews();
    this.getCartItemFromCart();
    this.getColorGuidePhotoUrl();
    this.getSizeGuidePhotoUrl();
  }

  addToCart() {
    if ((this.shippings?.length) > 0 && (!this.selectedShipping)) {
      alert("Please select shipping or delivery location");
      return;
    }
    if (this.quantity <= 0) {
      this.quantity = 1;
    }
    this.addToCart$ = this.cartService.addUpdateCartItemToCart(this.cart?.id, this.selectedProduct?.id, this.quantity, this.selectedShipping?.id)
      .subscribe(cartItem => {
        console.log(cartItem);
        this.selectedFeatures?.forEach(feature => {
          this.cartService.updateCartItemToFeature(this.cartItem?.id, feature?.id)
        })
        this.showAddedToCartAlert();
        // this.cartService.getCart().subscribe(()=>{})

      })
  }

  addToWishList() {
    if(!this.loggedUser){
      alert('Please log in to add to your wishlist')
      return;
    }
    if (!this.isInWishList()) {
      this.wcStoreService.addProductToWhishlist(this.selectedProduct?.id, this.loggedUser?.id).subscribe(() => {
        this.wcStoreService.getUserWishList(this.loggedUser?.id).subscribe(products => {
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
    this.wcStoreService.getProductById(this.selectedProductId ?? this.selectedProduct.id).subscribe(product => {
      this.selectedProduct = product;
      this.init();
    })
  }

  getFeatures() {
    // this.sizeFeatures = [];
    // this.colorFeatures = [];
    // this.otherFeatures = [];
    // this.selectedProduct?.features?.forEach(f => {
    //   if (f.name.search('size')) {
    //     this.sizeFeatures.push(f);
    //   } else if (f.name.search('color')) {
    //     this.colorFeatures.push(f);
    //   } else {
    //     this.otherFeatures.push(f);
    //   }
    // })
  }

  loadPhotos() {
    this.selectedProductPhotos = [];
    this.selectedProduct?.images?.forEach(p => {
      // console.log(p)
      const ph: any = new Photo();
      ph.source = environment.file_api_download_url_root + p.source;
      ph.thumbnail = environment.file_api_download_url_root + p.thumbnail;
      if(p.src){
        ph.source = p.src;
        ph.thumbnail = p.src;
      }
      this.selectedProductPhotos.push(ph);
      return ph;
    });
    // console.log(this.selectedProductPhotos);
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
    this.products = this.wcStoreService.getProductsLocalSync();
    const prev = this.Prev;
    if (prev) {
      this.wcStoreService.setSelectedProductLocal(prev).then(() => {
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
    this.products = this.wcStoreService.getProductsLocalSync();
    const next = this.Next;
    if (next)
      this.wcStoreService.setSelectedProductLocal(next).then(() => {
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
    if (index && (index < this.products?.length)) {
      return this.products[index + 1];
    }
    return undefined
  }

  get Prev() {
    let found = (UtilityService.searchObjFromArrray(this.selectedProduct?.id, this.products));
    let index = found ? found[1] : ((this.products?.length??0) - 1);
    if (index && (index > 0)) {
      return this.products[index - 1];
    }
    return undefined
  }

  getPhotoUrl(photos: any[]) {
    return StoreService.getPhotoUrlByDisplayTypeLocal(photos, 'cover', true, true);
  }

  getSizeGuidePhotoUrl() {
    this.sizeGuidePhoto = StoreService.getPhotoUrlByDisplayTypeLocal(this.selectedProduct?.images, 'size-guide') || 'assets/images/product/size_guide.png';
  }

  getColorGuidePhotoUrl() {
    this.colorGuidePhoto = StoreService.getPhotoUrlByDisplayTypeLocal(this.selectedProduct?.images, 'color-guide');
  }


  calculateRating() {
    return this.wcStoreService.getProductRating(this.selectedProduct);
  }

  isInWishList() {
    if (UtilityService.ObjInArray(this.wishList, this.selectedProduct, 'id')) {
      $('.product-single .btn-wishlist').removeClass('load-more-overlay loading')
        .html('<i class="d-icon-heart-full" style="color:#ed1d25"></i> Browse wishlist')
        .addClass('added')
        .attr('title', 'Browse wishlist')
        // .attr('href', '/main/pages/wishlist');
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
    const currentStock = (this.selectedProduct?.stock_quantity - this.quantity)
    return currentStock;
  }

  loadReviews() {
    this.wcStoreService.getProductReviews(this.selectedProduct?.id).subscribe(reviews => {
      // console.log(reviews);
      this.productReviews = reviews;
    });
  }

  getVideo() {
    // if (this.selectedProduct?.videos?.length > 0)
    //   return this.selectedProduct?.videos[0];
    // return undefined;
  }

  async getShipping(){
    this.wcStoreService.getProductShippings(this.selectedProduct?.id).subscribe(shps => {
      this.shippings = shps;
    })
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
