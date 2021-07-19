import { StoreService } from './../../shared/services/store.service';
import { Component, OnInit, AfterContentInit, AfterViewInit } from '@angular/core';
import { Store, StoreCategory } from 'src/app/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterContentInit, AfterViewInit {
  private stores: Store[] = [];
  private storeCategories: StoreCategory[] = [];

  constructor(
    private storeService: StoreService
  ) {

   }


  ngAfterViewInit(): void {
    setTimeout(() => {

    dispatchEvent(new Event('load'));
    dispatchEvent(new Event('mousewheel'));

    }, 1000);

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

}
