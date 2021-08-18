import { StoreService } from './../../shared/services/store.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Store } from 'src/app/models';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss']
})
export class StoresComponent implements OnInit, AfterViewInit {

  selectedStore: Store = new Store();

  constructor(
    private storeService: StoreService
  ) { }


  ngAfterViewInit(): void {
    this.selectedStore = this.storeService.getSelectedStoreLocalSync();
    console.log(this.selectedStore);
  }

  ngOnInit(): void {

  }

}
