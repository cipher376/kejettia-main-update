import { Component, OnInit, AfterContentInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from 'src/app/models';
import { PageInfo } from 'src/app/models/page';
import { UtilityService } from 'src/app/shared/services';
import { MY_ACTION, SignalService } from 'src/app/shared/services/signal.service';
import { StoreService } from 'src/app/shared/services/store.service';



export interface SearchKey {
  key: string;
  limit: number;
  skip: number;
}
export interface SearchObject {
  object: any;
  score: number;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, AfterContentInit {
  public sidenavOpen = true;
  public animation: any;   // Animation
  public sortByOrder = '';   // sorting
  public page = 1;
  public tagsFilters: any[] = [];
  public viewType = 'grid';
  public viewCol = 25;
  // public colorFilters: ColorFilter[] = [];

  FETCH_LIMIT = 100;
  FETCH_OFFSET = 0;

  pageInfo = {} as PageInfo;

  storeItems: Store[] = [];
  storeItemsPerPage = 5;

  productLoading = false;
  storeLoading = false;
  companyLoading = false;
  workersLoading = false;

  paramKey = '';


  constructor(
    private signal: SignalService,
    private util: UtilityService,
    private storeService: StoreService,
    // private productService: ProductService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      console.log(params);
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
    this.storeService.searchStore(key, this.pageInfo).subscribe((data: Store) => {
      this.storeItems = this.storeItems.concat(data);
      this.storeLoading = false;
      this.pageInfo.offset += this.storeItems.length;

    });

  }

  isLoading() {
    return this.companyLoading || this.storeLoading || this.productLoading;
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
}
