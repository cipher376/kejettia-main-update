import { Product } from 'src/app/models';
import { StoreService } from 'src/app/shared/services/store.service';
import { Component, OnInit } from '@angular/core';
import { WcProduct } from 'src/app/models/woocommerce.model';
import { WooCommerceStoreService } from 'src/app/shared/services/wc-store.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  selectedProduct: WcProduct = new WcProduct();
  pageType = 'simple'; // 'detail'

  constructor(
    private storeService: StoreService,
    private wcStoreService: WooCommerceStoreService,
  ) { }

  ngOnInit(): void {
    this.selectedProduct = this.wcStoreService.getSelectedProductLocalSync();
    this.loadPage();
  }


  loadPage() {
    let found = false;
    (this.selectedProduct as any)?.features?.forEach(f => {
      if (f.name.search('size') || f.name.search('color')) {
        found = true;
      }
    })
    if (found) {
      this.pageType = 'detail'
    } else {
      this.pageType = 'simple'
    }
  }

}
