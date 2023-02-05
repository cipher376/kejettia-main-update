import { Router } from '@angular/router';
import { PHOTO_DISPLAY_TYPES, Urls } from './../../config';
import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { StoreService } from 'src/app/shared/services/store.service';
import { Store } from 'src/app/models';
import { UtilityService } from 'src/app/shared/services';
import { WcProduct } from 'src/app/models/woocommerce.model';
import { WooCommerceStoreService } from 'src/app/shared/services/wc-store.service';

@Component({
  selector: 'app-top-products',
  templateUrl: './top-products.component.html',
  styleUrls: ['./top-products.component.scss']
})
export class TopProductsComponent implements OnInit, AfterViewInit {

  private products: WcProduct[] = [];
  private selectedStore: Store;
  photoUrl = '';
  @Input() title = '';

  constructor(
    private storeService: StoreService,
    private wcStoreService: WooCommerceStoreService,
    private router: Router
  ) { }

  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
  }

  @Input() set Products(prods: WcProduct[]) {
    this.products = prods;

  }

  getRating(p: WcProduct) {
    return this.wcStoreService.getProductRating(p);
  }

  getUrl(product: WcProduct) {
    return StoreService.getPhotoUrlByDisplayTypeLocal(product?.images, PHOTO_DISPLAY_TYPES.COVER, true, true);
  }

  get Products() {
    return this.products;
  }

  goToProduct(product: WcProduct) {
    this.wcStoreService.setSelectedProductLocal(product).then(() => {
      this.router.navigateByUrl(Urls.productDetails + '/' + product?.id);
    });
  }


}
