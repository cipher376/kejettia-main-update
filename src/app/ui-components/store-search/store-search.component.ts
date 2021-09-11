import { AfterContentInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from 'src/app/models';
import { PageInfo } from 'src/app/models/page';
import { UtilityService } from 'src/app/shared/services';
import { SignalService, MY_ACTION } from 'src/app/shared/services/signal.service';
import { StoreService } from 'src/app/shared/services/store.service';

@Component({
  selector: 'app-store-search',
  templateUrl: './store-search.component.html',
  styleUrls: ['./store-search.component.scss']
})
export class StoreSearchComponent implements OnInit, AfterContentInit {


  private sortKey = ''; // sorting the stores

  public page = 1;
  public layout = 'grid'; // list

  FETCH_LIMIT = 100;
  FETCH_OFFSET = 0;

  pageInfo = {} as PageInfo;

  storeItems: Store[] = [];
  sortedStoreItems: Store[] = [];
  storeItemsPerPage = 20;

  productLoading = false;
  storeLoading = false;
  companyLoading = false;
  workersLoading = false;

  paramKey = '';

  public storeItemsEvent = new EventEmitter<any>();


  constructor(
    private signal: SignalService,
    private util: UtilityService,
    private storeService: StoreService,
    // private productService: ProductService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      // console.log(params);
      this.paramKey = params.cat;
    });

    this.resetPage();
  }


  ngAfterContentInit(): void {
    this.resetPage();
  }

  ngOnInit(): void {
    this.signal._action$.subscribe(action => {
      if (action === MY_ACTION.searchInputTextChange) {
        this.resetPage();
        this.performSearch(this.paramKey);
        this.paramKey = '';
      }
    });

    this.resetPage();
    this.performSearch(this.paramKey);
    this.paramKey = '';
  }


  set SortKey(key: string) {
    this.sortKey = key;
    // perform sort
    this.sort();

  }
  get SortKey() {
    return this.sortKey;
  }


  set StoreItemsPerPage(size: number) {
    this.storeItemsPerPage = size;
    this.resetPage();
    this.performSearch();
  }



  resetPage() {
    this.pageInfo.limit = this.FETCH_LIMIT;
    this.pageInfo.offset = this.FETCH_OFFSET;
    this.storeItems = [];
  }

  getCurrentTotalItems() {
    const total = this.page * this.storeItemsPerPage;
    if (total > this.storeItems?.length) {
      return this.storeItems?.length;
    }
    return total;
  }

  async performSearch(key: string = null) {
    // get search term from disk
    if (!key) {
      key = await this.util.getSearchTermLocal();
    }

    // search for store
    this.storeLoading = true;
    this.storeService.searchStore(key, this.pageInfo).subscribe((data: Store[]) => {
        this.storeItems = this.storeItems.concat(data);
        this.storeItemsEvent.emit(this.storeItems);
        this.storeService.setStoresLocal(this.storeItems);
        this.storeLoading = false;
        this.pageInfo.offset += this.storeItems.length;
    });

  }

  isLoading() {
    return this.storeLoading;
  }

  public onPageChanged(event) {
    this.page = event;
    // this.stores;
    window.scrollTo(200, 0);

    // load more storeItems from the server
    const totalPages = Math.floor((this.storeItems.length / this.storeItemsPerPage) + 0.4);
    if (totalPages === this.page) {
      // load more from server
      this.performSearch();
    }
  }

  sort() {
    // switch (this.sortKey) {
    //   case 'default':
    //     this.sortedStoreItems = this.storeItems;
    //     break;
    //   case 'popularity':
    //     this.sortByPopularity();
    //     break;
    //   case 'rating':
    //     this.sortByRating();
    //     break;
    //   case 'date':
    //     this.sortByDate();
    //     break;
    //   case 'price-low':
    //     this.sortByPrice();
    //     break;
    //   case 'price-high':
    //     this.sortByPrice()
    //     break;
    //   default:
    //     this.sortedStoreItems = this.storeItems;
    //     break;
    // }
  }

  sortByPopularity() {

  }

  sortByRating() {

  }

  sortByDate() {

  }

  sortByPrice() {

  }

}
