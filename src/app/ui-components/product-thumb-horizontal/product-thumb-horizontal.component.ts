import { PhotoDisplayType } from './../../models/photo';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/shared/services/store.service';
import { Component, Input, OnInit } from '@angular/core';
import { PHOTO_DISPLAY_TYPES, Urls } from 'src/app/config';
import { UtilityService } from 'src/app/shared/services';
import { WcProduct } from 'src/app/models/woocommerce.model';
import { WooCommerceStoreService } from 'src/app/shared/services/wc-store.service';

@Component({
  selector: 'app-product-thumb-horizontal',
  templateUrl: './product-thumb-horizontal.component.html',
  styleUrls: ['./product-thumb-horizontal.component.scss']
})
export class ProductThumbHorizontalComponent implements OnInit {
  private product: WcProduct;
  photoUrl = '';
  discount = 0;
  constructor(
    private storeService: StoreService,
    private wcStoreService: WooCommerceStoreService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }


  @Input() set Product(prod: WcProduct) {
    this.product = prod;
    if (prod?.regular_price > prod?.sale_price)
      this.discount = ((prod.regular_price - prod.sale_price) / prod.regular_price) * 100;
    // console.log(this.discount);
    console.log(prod);
    this.photoUrl = StoreService.getPhotoUrlByDisplayTypeLocal(this.product.images, PHOTO_DISPLAY_TYPES.COVER, true, true);
  }


  get Product() {
    return this.product;
  }

  goToProduct() {
    this.wcStoreService.setSelectedProductLocal(this.product).then(() => {
      this.router.navigateByUrl(Urls.productDetails + '/' + this.product?.id);
    });
  }

  getCategory() {
    if (this.product?.categories?.length > 0) {
      return this.product?.categories[0]?.name
    }
    return '';
  }


  get IsNew() {
    if (UtilityService.calcDatesDiffInDays(this.product?.date_created) <= 7) // within 7 days means new
      return true;
    return false;
  }

  addToWishList() {
    // if(!this.loggedUser){
    //   alert('Please log in to add to your wishlist')
    //   return;
    // }
  }

  addToCart() {

  }



}
