import { Injectable } from '@angular/core';
import { FileItem } from '@wkoza/ngx-upload';
import { Subject } from 'rxjs';
import { LatLng } from '../models/map';


export enum MY_ACTION {
  unknown = 0,

  loadAllStores = 1.1,
  loadStoresByCountry = 1.2, // selectedStoreAddress: StoreAddress should be set via localStorage
  loadStoresByState = 1.3, // selectedStoreAddress should be set
  loadStoresBySuburb = 1.4, //  selectedStoreAddress should be set
  reloadStores = 1.5,
  storesLoaded = 1.6,
  recently_viewed_items_change = 1.7,


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

  reloadUser = 5.1,
  reloadUsers = 5.2,
  userLoaded = 5.3,
  usersLoaded = 5.4,
  loadAdminUsers = 5.5,
  loadAllUsers = 5.6,
  loadUsersByCountry = 5.7, // set country
  loadUsersByState = 5.8, // set country and state
  loadUsersByCity = 5.9, // set country, state, city

  rolesLoaded = 6.1,
  roleMapsLoaded = 6.2,
  reloadRoles = 6.3,
  reloadRoleMaps = 6.4,
  loadAllRoles = 6.5,

  // Google location and Geocoder signals
  locationChanged = 7.1, // location object should be set

  // General search signal, fires when text change in the search input filed
  searchInputTextChange = 8.0,
  searchDataLoaded = 8.1,

  loadAllCompanies = 9.0,
  companiesLoaded = 9.1


}

@Injectable({
  providedIn: 'root'
})
export class SignalService {
  private _actionSource = new Subject<MY_ACTION>();
  _action$ = this._actionSource.asObservable();

  private uploadCompleteSource = new Subject<any>();
  uploadCompleteSource$ = this.uploadCompleteSource.asObservable();


  constructor() { }


  sendAction(action: MY_ACTION) {
    this._actionSource.next(action);
  }

  private locationChangeSource = new Subject<LatLng>();
  locationChangeSource$ = this.locationChangeSource.asObservable();

  announceLocationChange(latLng: LatLng) {
    this.locationChangeSource.next(latLng);
  }
  announceUploadComplete(item: FileItem) {
    this.uploadCompleteSource.next(item);
  }

}
