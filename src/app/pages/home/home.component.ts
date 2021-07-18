import { StoreService } from './../../shared/services/store.service';
import { Component, OnInit } from '@angular/core';
import { Store, StoreCategory } from 'src/app/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private stores: Store[] = [];
  private storeCategories: StoreCategory[] = [];

  constructor(
    private storeService: StoreService
  ) { }

  ngOnInit(): void {
    this.getStoreCategories();

  }

  set StoreCategories(cat: StoreCategory[]){
    this.storeCategories = cat;
  }

  get StoreCategories(){
    return this.storeCategories;
  }

  getStoreCategories() {
    this.storeService.getStoreCategories().subscribe(categories => {
      this.storeCategories = categories;
      console.log(categories);
    })
  }

}
