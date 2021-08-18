import { Router } from '@angular/router';
import { StoreService } from 'src/app/shared/services/store.service';
import { Product } from './../../models/product';
import { Component, Input, OnInit } from '@angular/core';
import { Urls } from 'src/app/config';
import { UtilityService } from 'src/app/shared/services';

@Component({
  selector: 'app-product-thumb-horizontal',
  templateUrl: './product-thumb-horizontal.component.html',
  styleUrls: ['./product-thumb-horizontal.component.scss']
})
export class ProductThumbHorizontalComponent implements OnInit {
  private product: Product;
  discount = 0;
  constructor(
    private storeService: StoreService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }


  @Input() set Product(prod: Product) {
    this.product = prod;
    if (prod?.previousPrice > prod?.currentPrice)
      this.discount = ((prod.previousPrice - prod.currentPrice) / prod.previousPrice) * 100;
    console.log(this.discount);
  }


  get Product() {
    return this.product;
  }

  goToProduct() {
    this.storeService.setSelectedProductLocal(this.product).then(() => {
      this.router.navigateByUrl(Urls.productDetails + '/' + this.product?.id);
    });
  }

  getCategory() {
    if (this.product?.productCategoryItems?.length > 0) {
      return this.product?.productCategoryItems[0]?.name
    }
    return '';
  }


  get IsNew() {
    if (UtilityService.calcDatesDiffInDays(this.product?.dateCreated) <= 7) // within 7 days means new
      return true;
    return false;
  }

  addToWishList() {

  }

  addToCart() {

  }



}
