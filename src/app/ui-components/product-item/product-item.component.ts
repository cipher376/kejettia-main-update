import { PHOTO_DISPLAY_TYPES } from './../../config';
import { ChangeDetectorRef, Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Urls } from 'src/app/config';
import { Product } from 'src/app/models';
import { UtilityService } from 'src/app/shared/services';
import { StoreService } from 'src/app/shared/services/store.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit, AfterViewInit {
  private product: Product;
  photoUrl = '';
  discount = 0;
  @Input() layout = 'grid'; // 'list'

  constructor(
    private cd: ChangeDetectorRef,
    private router: Router,
    private storeService: StoreService
  ) { }

  ngAfterViewInit(): void {
    // if (this.product) {
    //   this.photoUrl = StoreService.getPhotoUrlByDisplayTypeLocal(this.product?.photos, 'cover', true);
    // }

  }

  ngOnInit(): void {
  }

  @Input() set Product(product: Product) {
    this.product = product;
    // console.log(this.product);
    if (product?.previousPrice > product?.currentPrice)
      this.discount = ((product.previousPrice - product.currentPrice) / product.previousPrice) * 100;
    this.photoUrl = StoreService.getPhotoUrlByDisplayTypeLocal(this.product?.photos, PHOTO_DISPLAY_TYPES.COVER, true, true);
    this.cd.detectChanges();
  }

  get Product() {
    return this.product;
  }



  getCategory() {
    if (this.product?.productCategoryItems?.length > 0) {
      return this.product?.productCategoryItems[0]?.name
    }
    return '';
  }

  getRating() {
    StoreService.getProductRating(this.product);
  }

  get IsNew() {
    if (UtilityService.calcDatesDiffInDays(this.product?.dateCreated) <= 7) // within 7 days means new
      return true;
    return false;
  }

  goToProduct() {
    this.storeService.setSelectedProductLocal(this.product).then(() => {
      this.router.navigateByUrl(Urls.productDetails + '/' + this.product?.id);
    });
  }

  addToCart() {

  }

  addToWishlist() {

  }


}
