import { StoreService } from './../../shared/services/store.service';
import { Component, OnInit, AfterContentInit, AfterViewInit } from '@angular/core';
import { ProductCategoryItem, Store, StoreCategory } from 'src/app/models';
import { UtilityService } from 'src/app/shared/services';

declare var $: any;
declare var Window: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterContentInit, AfterViewInit {
  private stores: Store[] = [];
  private storeCategories: StoreCategory[] = [];
  private productCategoryItems: ProductCategoryItem[] = [];

  premiumStores: Store[] = [];

  showLoader = false;
  constructor(
    private storeService: StoreService
  ) {
    Window = window;
  }


  ngAfterViewInit(): void {
    Window.Riode.init();
    Window.Riode.slider('.owl-carousel'); // Initialize slider

    // Window.Riode.prepare();
    // Window.Riode.status = 'loaded';
    // Window.Riode.$body.addClass('loaded');
    // Window.Riode.$window.trigger('riode_load');
    // Window.Riode.call(Window.Riode.initLayout);
    // Window.Riode.call(Window.Riode.init);
    // Window.Riode.$window.trigger('riode_complete');
    // Window.Riode.refreshSidebar();
    // Window.Riode.isotopes('.grid:not(.grid-float)');
  }


  ngAfterContentInit(): void {
    this.loadPremiumStores();
    setTimeout(() => {
      // this.showLoader = false;
      dispatchEvent(new Event('load'));
      dispatchEvent(new Event('mousewheel'));
    }, 1000);
  }

  ngOnInit(): void {
    this.getStoreCategories();
    this.getProductCategoryItems();
  }

  set StoreCategories(cat: StoreCategory[]) {
    this.storeCategories = cat;
  }

  get StoreCategories() {
    return this.storeCategories;
  }

  set ProductCategoryItems(cats: ProductCategoryItem[]) {
    this.productCategoryItems = cats;
    console.log(cats);
  }

  get ProductCategoryItems() {
    return this.productCategoryItems;
  }
  getStoreCategories() {
    this.storeService.getStoreCategories().subscribe(categories => {
      this.storeCategories = categories;
      console.log(categories);
    })
  }

  getProductCategoryItems() {
    this.storeService.getProductCategoryItems().subscribe(cats => {
      this.productCategoryItems = cats;
      console.log(cats);
    })
  }

  loadPremiumStores() {
    this.storeService.getPremiumStores().subscribe(stores => {
      this.premiumStores = UtilityService.shuffle(stores).slice(0, 3);
      console.log(this.premiumStores);
    });
  }



}
