import { PHOTO_DISPLAY_TYPES } from './../../config';
import { Product } from './../../models/product';
import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { StoreService } from 'src/app/shared/services/store.service';
import { Store } from 'src/app/models';
import { UtilityService } from 'src/app/shared/services';

@Component({
  selector: 'app-top-products',
  templateUrl: './top-products.component.html',
  styleUrls: ['./top-products.component.scss']
})
export class TopProductsComponent implements OnInit, AfterViewInit {

  private products: Product[] = [];
  private selectedStore: Store;
  photoUrl = '';
  @Input() title = '';

  constructor(
    private storeService: StoreService
  ) { }

  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
  }

  @Input() set Products(prods: Product[]) {
    this.products = prods;

  }

  getUrl(product: Product) {
    return StoreService.getPhotoUrlByDisplayTypeLocal(product?.photos, PHOTO_DISPLAY_TYPES.COVER, true, true);

  }

  get Products() {
    return this.products;
  }

}
