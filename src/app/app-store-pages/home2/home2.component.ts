import { UtilityService } from './../../shared/services/utility.service';
import { StoreCategory } from './../../models/store-category';
import { PHOTO_DISPLAY_TYPES } from './../../config';
import { environment } from './../../../environments/environment';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Photo, Product, ProductBrand, Store } from 'src/app/models';
import { StoreService } from 'src/app/shared/services/store.service';

declare var $: any;
declare var Window: any;
@Component({
  selector: 'app-home2',
  templateUrl: './home2.component.html',
  styleUrls: ['./home2.component.scss']
})
export class Home2Component implements OnInit, AfterViewInit {

  selectedStore: Store = new Store();
  logoUrl = '';
  sliderPhotos: Photo[] = [];
  storeCategories: StoreCategory[] = [];
  featuredProducts: Product[] = [];

  brands: ProductBrand[] = [];

  fileUrl = environment.file_api_download_url_root;

  showLoader = true;

  constructor(
    private storeService: StoreService
  ) {
    Window = window;

  }


  ngAfterViewInit(): void {
    this.selectedStore = this.storeService.getSelectedStoreLocalSync();
    setTimeout(() => {
      dispatchEvent(new Event('load'));
      dispatchEvent(new Event('mousewheel'));
      Window.Riode.init();
      Window.Riode.slider('.owl-carousel'); // Initialize slider

      Window.Riode.prepare();
      Window.Riode.status = 'loaded';
      Window.Riode.$body.addClass('loaded');
      Window.Riode.$window.trigger('riode_load');
      Window.Riode.call(Window.Riode.initLayout);
      Window.Riode.call(Window.Riode.init);
      Window.Riode.$window.trigger('riode_complete');
      Window.Riode.refreshSidebar();
      Window.Riode.isotopes('.grid:not(.grid-float)');
    }, 1000);
  }

  ngOnInit(): void {
    this.selectedStore = this.storeService.getSelectedStoreLocalSync();
    this.init();
  }

  init() {
    this.storeService.getStoreById(this.selectedStore?.id).subscribe(store => {
      this.selectedStore = store;
      this.storeService.setSelectedStoreLocal(store);

      this.logoUrl = StoreService.getPhotoUrlByDisplayTypeLocal(this.selectedStore.photos, PHOTO_DISPLAY_TYPES.LOGO, true, true);
      // console.log(store);

      this.sliderPhotos = [];
      // this.refreshStore().then(() => {
      this.storeCategories = UtilityService.shuffle(this.selectedStore.storeCategories);

      // this.storeService.getCategoriesByStore(this.selectedStore?.id).subscribe(cats => {
      //   this.selectedStore.storeCategories = cats;
      //   this.storeService.setSelectedStoreLocal(this.selectedStore);
      // })


      this.selectedStore?.photos.forEach(ph => {
        // TODO:
        // if (ph.photoDisplayType.type === PHOTO_DISPLAY_TYPES.BANNER) { // change to this after testing
        if (ph.photoDisplayType.type === PHOTO_DISPLAY_TYPES.BANNER) {
          this.sliderPhotos = [...this.sliderPhotos, ph];
        }
      });

      this.featuredProducts = UtilityService.shuffle(this.selectedStore.products);
      if (this.featuredProducts?.length > 0) {
        this.featuredProducts = this.featuredProducts.slice(0, 10);
      }

      // brands;
      this.brands = [];
      this.selectedStore.products?.forEach(p => {
        const b = p?.productModel?.productBrand;
        console.log(b);
        if (!this.brands.includes(b))
          this.brands.push(b)
      })

      this.showLoader = false;
      window.scrollTo( 0, 10)
      setTimeout(() => {
      window.scrollTo( 0, 0)
      }, 100);
    })
    // })

  }

  // refreshStore() {
  //   return new Promise((resolve, reject) => {
  //     this.storeService.getStoreById(this.selectedStore?.id).subscribe(store => {
  //       this.selectedStore = store;
  //       this.storeService.setSelectedStoreLocal(store);
  //       resolve(true);
  //     })
  //   })
  // }

  getCategories() {

  }

}
