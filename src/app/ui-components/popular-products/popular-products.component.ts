import { PHOTO_DISPLAY_TYPES } from './../../config';
import { Router } from '@angular/router';
import { Product } from 'src/app/models';
import { StoreService } from 'src/app/shared/services/store.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Urls } from 'src/app/config';

@Component({
  selector: 'app-popular-products',
  templateUrl: './popular-products.component.html',
  styleUrls: ['./popular-products.component.scss']
})
export class PopularProductsComponent implements OnInit, AfterViewInit {

  private products: Product[][] = [];
  COLUMNS_LENGTH = 4;

  constructor(
    private storeService: StoreService,
    private router: Router
  ) { }



  ngAfterViewInit(): void {
    this.storeService.getPopularProducts().subscribe(ps => {
      console.log(ps);
      let prods: Product[][] = [];
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

  goToProduct(p: Product) {
    this.storeService.setSelectedProductLocal(p).then(() => {
      this.router.navigateByUrl(Urls.productDetails + '/' + p?.id);
    });
  }

  getProductImage(prod: Product) {
    return StoreService.getPhotoUrlByDisplayTypeLocal(prod.photos, PHOTO_DISPLAY_TYPES.COVER, true, true);
  }


}
