import { MyFile } from './../../models/file';
import { Injectable } from '@angular/core';
// import { FileItem } from '@wkoza/ngx-upload';
import { Subject } from 'rxjs';
import { LatLng, Photo, Video } from 'src/app/models';


export enum MY_ACTION {

  loadAllStores = 1.1,
  loadStoresByCountry = 1.2, // selectedStoreAddress: StoreAddress should be set via localStorage
  loadStoresByState = 1.3, // selectedStoreAddress should be set
  loadStoresBySuburb = 1.4, //  selectedStoreAddress should be set
  reloadStores = 1.5,
  storesLoaded = 1.6,
  selected_store_change = 1.7,


  // Product categories
  loadAllProductCategories = 2.1,
  loadProductCategoriesByStore = 2.2, // selectedStore
  reloadProductCategories = 2.3,
  productCategoriesLoaded = 2.4,

  // Data table actions
  delete = 3.1,

  // Product Items
  reloadProductItems = 4.1,
  loadAllProducts = 4.2,
  loadProductsByStore = 4.3, // selectedStore set via local storage
  loadProductsByCategory = 4.4, // selectedProductCategory set via local storage
  productsLoaded = 4.5,
  recently_viewed_products_change = 4.6,

  reloadUser = 5.1,
  reloadUsers = 5.2,
  userLoaded = 5.3,
  usersLoaded = 5.4,
  loadAdminUsers = 5.5,
  loadAllUsers = 5.6,
  loadUsersByCountry = 5.7, // set country
  loadUsersByState = 5.8, // set country and state
  loadUsersByCity = 5.9, // set country, state, city
  userCountryChange = 5.11,

  rolesLoaded = 6.1,
  roleMapsLoaded = 6.2,
  reloadRoles = 6.3,
  reloadRoleMaps = 6.4,
  loadAllRoles = 6.5,

  // Google location and Geocoder signals
  locationChanged = 7.1, // location object should be set

  // User cart management signals
  cartChanged = 8.0,
  orderChanged = 8.1,
  saveDeliveryInfo = 8.2,
  cartLoaded = 8.3,
  ordersLoaded = 8.4,
  ordersChangedRemote = 8.5,

  // Favourites
  favouritesLoaded = 9.0,


  // PAYSTACK
  paystackTransactionInitiated = 10.0,
  paystackTransactionSuccess = 10.1,
  paystackTransactionCancelled = 10.2,

  // General search signal, fires when text change in the search input filed
  searchInputTextChange = 11.0,
  searchDataLoaded = 11.1,

}

@Injectable({
  providedIn: 'root'
})
export class SignalService {
  private _actionSource = new Subject<MY_ACTION>();
  _action$ = this._actionSource.asObservable();


  private locationChangeSource = new Subject<LatLng>();
  locationChangeSource$ = this.locationChangeSource.asObservable();

  private uploadCompleteSource = new Subject<MyFile[]>();
  uploadCompleteSource$ = this.uploadCompleteSource.asObservable();

  private imagesLoadedSource = new Subject<Photo[]>();
  imagesLoadedSource$ = this.imagesLoadedSource.asObservable();

  private videosLoadedSource = new Subject<Video[]>();
  videosLoadedSource$ = this.videosLoadedSource.asObservable();


  constructor() { }


  sendAction(action: MY_ACTION) {
    console.log(action);
    this._actionSource.next(action);
  }

  announceLocationChange(latLng: LatLng) {
    this.locationChangeSource.next(latLng);
  }

  announceUploadComplete(files: MyFile[]) {
    this.uploadCompleteSource.next(files);
  }

  announceImagesLoaded(photos: Photo[]) {
    this.imagesLoadedSource.next(photos);
  }
  announceVideosLoaded(videos: Video[]) {
    this.videosLoadedSource.next(videos);
  }

  // announceNewMessageBatchNumber(batch: number) {
  //   this.messageGroupBatchNumberSource.next(batch);
  // }

}
