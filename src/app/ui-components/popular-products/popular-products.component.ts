import { PHOTO_DISPLAY_TYPES } from './../../config';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/shared/services/store.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Urls } from 'src/app/config';
import { WooCommerceStoreService } from 'src/app/shared/services/wc-store.service';
import { WcProduct } from 'src/app/models/woocommerce.model';

@Component({
  selector: 'app-popular-products',
  templateUrl: './popular-products.component.html',
  styleUrls: ['./popular-products.component.scss']
})
export class PopularProductsComponent implements OnInit, AfterViewInit {

  private products: WcProduct[][] = [];
  COLUMNS_LENGTH = 4;

  constructor(
    private storeService: StoreService,
    private wcStoreService: WooCommerceStoreService,
    private router: Router
  ) { }



  ngAfterViewInit(): void {
    this.storeService.getPopularProducts().subscribe(ps => {
      console.log(ps);
      let prods: WcProduct[][] = [];
      let cols = Math.floor((ps?.length ?? 0) / this.COLUMNS_LENGTH);
      if (cols < (ps?.length / this.COLUMNS_LENGTH)) {
        cols += 1;
      }
      if (cols && cols > 0) {
        for (let i = 0; i < cols; i++) {
          prods.push(ps.splice(0, this.COLUMNS_LENGTH))
        }
      } else {
        prods.push(ps)
      }
      this.products = prods;
    })
  }

  ngOnInit(): void {
  }


  get Products() {
    return this.products;
  }

  getRating(p: WcProduct){
    return p.average_rating;
  }

  goToProduct(p: WcProduct) {
    this.wcStoreService.setSelectedProductLocal(p).then(() => {
      this.router.navigateByUrl(Urls.productDetails + '/' + p?.id);
    });
  }

  getProductImage(prod: WcProduct) {
    return StoreService.getPhotoUrlByDisplayTypeLocal(prod.images, PHOTO_DISPLAY_TYPES.COVER, true, true);
  }


}
