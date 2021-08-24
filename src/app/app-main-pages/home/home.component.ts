import { StoreService } from './../../shared/services/store.service';
import { Component, OnInit, AfterContentInit, AfterViewInit } from '@angular/core';
import { Store, StoreCategory } from 'src/app/models';
import { UtilityService } from 'src/app/shared/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterContentInit, AfterViewInit {
  private stores: Store[] = [];
  private storeCategories: StoreCategory[] = [];
  premiumStores: Store[] = [];

  constructor(
    private storeService: StoreService
  ) {

  }


  ngAfterViewInit(): void {
    setTimeout(() => {
      dispatchEvent(new Event('load'));
      dispatchEvent(new Event('mousewheel'));
    }, 1000);
    this.loadPremiumStores();
  }


  ngAfterContentInit(): void {
  }

  ngOnInit(): void {

    this.getStoreCategories();

  }

  set StoreCategories(cat: StoreCategory[]) {
    this.storeCategories = cat;
  }

  get StoreCategories() {
    return this.storeCategories;
  }

  getStoreCategories() {
    this.storeService.getStoreCategories().subscribe(categories => {
      this.storeCategories = categories;
      console.log(categories);
    })
  }

  loadPremiumStores() {
    this.storeService.getPremiumStores().subscribe(stores => {
      this.premiumStores = UtilityService.shuffle(stores).slice(0, 3);
      console.log(this.premiumStores);
    });
  }



}
