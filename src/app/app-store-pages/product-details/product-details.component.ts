import { Product } from 'src/app/models';
import { StoreService } from 'src/app/shared/services/store.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  selectedProduct: Product = new Product();
  pageType = 'simple'; // 'detail'

  constructor(
    private storeService: StoreService
  ) { }

  ngOnInit(): void {
    this.selectedProduct = this.storeService.getSelectedProductLocalSync();
    this.loadPage();
  }


  loadPage() {
    let found = false;
    this.selectedProduct?.features?.forEach(f => {
      if (f.name.includes('size') || f.name.includes('color')) {
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
