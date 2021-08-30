import { StoreService } from 'src/app/shared/services/store.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Store } from 'src/app/models/store';
import { Product } from 'src/app/models';
import { Location } from '@angular/common';

@Component({
  selector: 'app-store-product-list',
  templateUrl: './store-product-list.component.html',
  styleUrls: ['./store-product-list.component.scss']
})
export class StoreProductListComponent implements OnInit, AfterViewInit {
  selectedStore: Store;
  private sortKey = ''; // sorting the products

  public page = 1;
  public layout = 'grid'; // list

  productItemsPerPage = 20;
  productItems: Product[] = [];
  sortedProductItems: Product[] = [];

  constructor(
    private storeService: StoreService,
    private location: Location
  ) { }


  ngAfterViewInit(): void {
    this.selectedStore = this.storeService.getSelectedStoreLocalSync();
    this.loadProducts();
  }

  ngOnInit(): void {

  }


  set SortKey(key: string) {
    this.sortKey = key;
    // perform sort
    this.sort();

  }
  get SortKey() {
    return this.sortKey;
  }


  set ProductItemsPerPage(size: number) {
    this.productItemsPerPage = size;
    this.loadProducts();
  }

  getCurrentTotalItems() {
    const total = this.page * this.productItemsPerPage;
    if (total > this.productItems?.length) {
      return this.productItems?.length;
    }
    return total;
  }

  loadProducts(){
    this.productItems = this.selectedStore.products;
    this.sortedProductItems = this.productItems;
    this.storeService.setProductsLocal(this.productItems);

  }

  public onPageChanged(event) {
    this.page = event;
    // this.products;
    window.scrollTo(200, 0);

    // load more productItems from the server
    const totalPages = Math.floor((this.productItems.length / this.productItemsPerPage) + 0.4);
    if (totalPages === this.page) {
      // load more from server
      // this.performSearch();
    }
  }


  sort() {
    switch (this.sortKey) {
      case 'default':
        this.sortedProductItems = this.productItems;
        break;
      case 'popularity':
        this.sortByPopularity();
        break;
      case 'rating':
        this.sortByRating();
        break;
      case 'date':
        this.sortByDate();
        break;
      case 'price-low':
        this.sortByPrice();
        break;
      case 'price-high':
        this.sortByPrice()
        break;
      default:
        this.sortedProductItems = this.productItems;
        break;
    }
  }

  sortByPopularity(){

  }

  sortByRating(){

  }

  sortByDate(){

  }

  sortByPrice(){

  }

  goBack(){
    this.location.back();
  }

}
