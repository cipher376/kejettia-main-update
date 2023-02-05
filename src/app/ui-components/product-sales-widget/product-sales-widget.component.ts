import { UtilityService } from './../../shared/services/utility.service';
import { StoreService } from 'src/app/shared/services/store.service';
import { Store } from './../../models/store';
import { Component, OnInit } from '@angular/core';
import { WcProduct } from 'src/app/models/woocommerce.model';

@Component({
  selector: 'app-product-sales-widget',
  templateUrl: './product-sales-widget.component.html',
  styleUrls: ['./product-sales-widget.component.scss']
})
export class ProductSalesWidgetComponent implements OnInit {

  selectedStore: Store;

  topProducts: WcProduct[] = [];
  latestProducts: WcProduct[] = [];
  bestOfWeek: WcProduct[] = [];



  constructor(
    private storeService: StoreService
  ) { }

  ngOnInit(): void {
    this.selectedStore = this.storeService.getSelectedStoreLocalSync()
    this.init();
  }


  init(){
    this.topProducts = UtilityService.shuffle(this.selectedStore.products).slice(0,3);
    this.latestProducts = UtilityService.shuffle(this.selectedStore.products).slice(0,3);
    this.bestOfWeek = UtilityService.shuffle(this.selectedStore.products).slice(0,3);
  }

}
