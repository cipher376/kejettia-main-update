import { StoreService } from 'src/app/shared/services/store.service';
import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/app/shared/services';
import { WooCommerceStoreService } from 'src/app/shared/services/wc-store.service';
import { WcProduct } from 'src/app/models/woocommerce.model';

@Component({
  selector: 'app-product-list-widget',
  templateUrl: './product-list-widget.component.html',
  styleUrls: ['./product-list-widget.component.scss']
})
export class ProductListWidgetComponent implements OnInit {

  private products: WcProduct[] = [];

  constructor(
    private storeService: StoreService, 
    private wcStoreService: WooCommerceStoreService
  ) { }

  ngOnInit(): void {
    // this.getProducts();
    this.getWcProducts();
  }

  get Products() {
    return this.products
  }

  getProducts() {
    this.storeService.getProducts().subscribe(prods => {
      this.products = UtilityService.shuffle(prods);
    })
  }

  getWcProducts(){
    this.wcStoreService.getWcProducts().subscribe(prods => {
      this.products = UtilityService.shuffle(prods);
    })
  }

}
