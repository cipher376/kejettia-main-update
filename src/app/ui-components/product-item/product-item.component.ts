import { UserService } from './../../shared/services/user.service';
import { PHOTO_DISPLAY_TYPES } from './../../config';
import { ChangeDetectorRef, Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Urls } from 'src/app/config';
import { User } from 'src/app/models';
import { UtilityService } from 'src/app/shared/services';
import { StoreService } from 'src/app/shared/services/store.service';
import { MY_ACTION, SignalService } from 'src/app/shared/services/signal.service';
import { WcProduct } from 'src/app/models/woocommerce.model';
import { WooCommerceStoreService } from 'src/app/shared/services/wc-store.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit, AfterViewInit {
  private product: WcProduct;
  photoUrl = '';
  discount = 0;
  @Input() layout = 'grid'; // 'list'

  loggedUser: User;

  wishList: WcProduct[] = [];

  constructor(
    private cd: ChangeDetectorRef,
    private router: Router,
    private storeService: StoreService,
    private wcStoreService: WooCommerceStoreService,
    private userService: UserService,
    private signal: SignalService
  ) { }

  ngAfterViewInit(): void {
    this.wishList = this.wcStoreService.getWishListLocalSync();
    this.isInWishList();


  }

  ngOnInit(): void {
    this.loggedUser = this.userService.getLoggedUserLocalSync();
    this.signal._action$.subscribe(action => {
      if (action === MY_ACTION.wish_list_changed) {
        this.wishList = this.wcStoreService.getWishListLocalSync();
      }
    })
  }

  @Input() set Product(product: WcProduct) {
    this.product = product;
    // console.log(this.product);
    if (product?.regular_price > product?.price)
      this.discount = ((product.regular_price - product.price) / product.regular_price) * 100;
    this.photoUrl = StoreService.getPhotoUrlByDisplayTypeLocal(this.product?.images, PHOTO_DISPLAY_TYPES.COVER, true, true);
    this.cd.detectChanges();
  }

  get Product() {
    return this.product;
  }



  getCategory() {
    if (this.product?.categories?.length > 0) {
      return this.product?.categories[0]?.name
    }
    return '';
  }

  get Rating() {
    return this.wcStoreService.getProductRating(this.product);
  }
  get Reviews() {
    return this.wcStoreService.getProductReviews(this.product?.id)
  }

  get IsNew() {
    if (UtilityService.calcDatesDiffInDays(this.product?.date_created) <= 7) // within 7 days means new
      return true;
    return false;
  }

  isInWishList() {
    return UtilityService.ObjInArray(this.wishList, this.product, 'id');
  }

  goToProduct() {
    this.wcStoreService.setSelectedProductLocal(this.product).then(() => {
      this.router.navigateByUrl(Urls.productDetails + '/' + this.product?.id);
    });
  }

  addToCart() {

  }

  addToWishlist(evt) {
    evt?.preventDefault();
    if(!this.loggedUser){
      alert('Please log in to add to your wishlist')
      return;
    }
    if (!this.isInWishList()) {
      this.storeService.addProductToWhishlist(this.product?.id, this.loggedUser?.id).subscribe(() => {
        // this.storeService.getUserWishList(this.loggedUser?.id).subscribe(products => {
        //   this.wishList = products;
        //   console.log(this.wishList);
        // });
      })
    }
  }


}
