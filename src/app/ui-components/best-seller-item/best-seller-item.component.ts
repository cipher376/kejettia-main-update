import { StoreService } from './../../shared/services/store.service';
import { Component, Input, OnInit } from '@angular/core';
import { Store } from 'src/app/models';

@Component({
  selector: 'app-best-seller-item',
  templateUrl: './best-seller-item.component.html',
  styleUrls: ['./best-seller-item.component.scss']
})
export class BestSellerItemComponent implements OnInit {

  store = new Store();

  constructor(
     ) { }

  ngOnInit() {
  }


  @Input() set Store(store: Store){
    this.store = store;
  }

  getStorePhoto(){
    return StoreService.getPhotoUrlByDisplayTypeLocal(this.store?.photos || [], 'cover', true)
  }

}
