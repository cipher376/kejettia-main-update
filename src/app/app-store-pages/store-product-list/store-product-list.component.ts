import { StoreService } from 'src/app/shared/services/store.service';
import { Component, OnInit } from '@angular/core';
import { Store } from 'src/app/models/store';

@Component({
  selector: 'app-store-product-list',
  templateUrl: './store-product-list.component.html',
  styleUrls: ['./store-product-list.component.scss']
})
export class StoreProductListComponent implements OnInit {
  selectedStore: Store;
  constructor(
    private storeService: StoreService
  ) { }

  ngOnInit(): void {
    this.selectedStore = this.storeService.getSelectedStoreLocalSync();
  }

}
