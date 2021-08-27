import { StoreService } from 'src/app/shared/services/store.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models';
import { UtilityService } from 'src/app/shared/services';

@Component({
  selector: 'app-product-list-widget',
  templateUrl: './product-list-widget.component.html',
  styleUrls: ['./product-list-widget.component.scss']
})
export class ProductListWidgetComponent implements OnInit {

  private products: Product[] = [];

  constructor(
    private storeService: StoreService
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  get Products() {
    return this.products
  }

  getProducts() {
    this.storeService.getProducts().subscribe(prods => {
      this.products = UtilityService.shuffle(prods);
    })
  }

}
