import { Product } from './../../models/product';
import { Component, Input, OnInit } from '@angular/core';
import { StoreService } from 'src/app/shared/services/store.service';

@Component({
  selector: 'app-top-products',
  templateUrl: './top-products.component.html',
  styleUrls: ['./top-products.component.scss']
})
export class TopProductsComponent implements OnInit {

  private products: Product[] = [];
  photoUrl = '';
  @Input() title = '';

  constructor() { }

  ngOnInit(): void {
  }

  @Input() set Products(prods: Product[]) {
    this.products = prods;
  }

  getUrl(product: Product) {
    return StoreService.getPhotoUrlByDisplayTypeLocal(product?.photos, 'cover', true, true);

  }

  get Products() {
    return this.products;
  }

}
