import { Store } from 'src/app/models';
import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/shared/services/store.service';

@Component({
  selector: 'app-best-sellers',
  templateUrl: './best-sellers.component.html',
  styleUrls: ['./best-sellers.component.scss']
})
export class BestSellersComponent implements OnInit {

  stores: Store[]=[];
  constructor(
    private storeService: StoreService
  ) { }

  ngOnInit(): void {
    this.getStores();
  }

  getStores(){
    this.storeService.getAllStores()?.subscribe(stores => {
      this.stores = stores;
    })
  }

}
