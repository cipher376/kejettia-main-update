import { UtilityService } from './../../shared/services/utility.service';
import { StoreCategory } from './../../models/store-category';
import { PHOTO_DISPLAY_TYPES } from './../../config';
import { environment } from './../../../environments/environment';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Photo, Product, Store } from 'src/app/models';
import { StoreService } from 'src/app/shared/services/store.service';

@Component({
  selector: 'app-home2',
  templateUrl: './home2.component.html',
  styleUrls: ['./home2.component.scss']
})
export class Home2Component implements OnInit, AfterViewInit {

  selectedStore: Store = new Store();
  sliderPhotos: Photo[] = [];
  storeCategories: StoreCategory[] = [];
  featuredProducts: Product[] = [];

  fileUrl = environment.file_api_download_url_root;

  constructor(
    private storeService: StoreService
  ) { }


  ngAfterViewInit(): void {
    this.selectedStore = this.storeService.getSelectedStoreLocalSync();
    console.log(this.selectedStore);
    this.init();
    setTimeout(() => {
      dispatchEvent(new Event('load'));
      dispatchEvent(new Event('mousewheel'));
    }, 1000);
  }

  ngOnInit(): void {
  }

  init() {
    this.sliderPhotos = [];
    this.storeCategories = UtilityService.shuffle(this.selectedStore.storeCategories);
    // refresh categories
    this.storeService.getCategoriesByStore(this.selectedStore?.id).subscribe(cats => {
      this.selectedStore.storeCategories = cats;
      this.storeCategories = UtilityService.shuffle(this.selectedStore.storeCategories);
      this.storeService.setSelectedStoreLocal(this.selectedStore);
    })
    this.selectedStore?.photos.forEach(ph => {
      // TODO:
      // if (ph.photoDisplayType.type === PHOTO_DISPLAY_TYPES.BANNER) { // change to this after testing
      if (ph.photoDisplayType.type === PHOTO_DISPLAY_TYPES.COVER) {
        this.sliderPhotos.push(ph);
      }
    });

    this.featuredProducts = UtilityService.shuffle(this.selectedStore.products);
    if (this.featuredProducts?.length > 0) {
      this.featuredProducts = this.featuredProducts.slice(0, 10);
    }

    console.log(this.sliderPhotos);
  }

  getCategories() {

  }

}
