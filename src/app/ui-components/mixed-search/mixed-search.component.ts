import { Component, OnInit, EventEmitter, AfterViewInit, AfterContentInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, Store } from 'src/app/models';
import { PageInfo } from 'src/app/models/page';
import { UtilityService } from 'src/app/shared/services';
import { MY_ACTION, SignalService } from 'src/app/shared/services/signal.service';
import { StoreService } from 'src/app/shared/services/store.service';
import { SEARCH_PAGE_FILTER } from '../search-nav/search-nav.component';

@Component({
  selector: 'app-mixed-search',
  templateUrl: './mixed-search.component.html',
  styleUrls: ['./mixed-search.component.scss']
})
export class MixedSearchComponent implements OnInit, AfterContentInit {

  private searchPageFilter;

  public sortKey = ''; // sorting the stores

  public page = 1;
  public layout = 'grid'; // list

  FETCH_LIMIT = 100;
  FETCH_OFFSET = 0;
  pageInfo = {} as PageInfo;

  private items: any[] = [];
  sortedItems: any[] = [];
  itemsPerPage = 20;

  loading = false;

  paramKey = '';
  public itemsEvent = new EventEmitter<any>();

  constructor(
    private signal: SignalService,
    private util: UtilityService,
    private storeService: StoreService,
    private route: ActivatedRoute

  ) {

    this.route.params.subscribe(params => {
      console.log(params);
      this.paramKey = params.cat;
    });

    this.resetPage();
  }

  ngAfterContentInit(): void {
    setTimeout(() => {
      this.resetPage();

    }, 100);
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



  get Items() {
    return this.items;
  }

  set ItemsPerPage(size: number) {
    this.itemsPerPage = size;
    this.resetPage();
    this.performSearch();
  }

  get ItemsPerPage() {
    return this.itemsPerPage;
  }

  set SearchPageFilter(filter: string[]) {
    setTimeout(() => {
      this.searchPageFilter = filter;
      const filteredItems = [];
      this.sortedItems.forEach(item => {
        console.log(item.constructor.name)
      });
    }, 100);

  }

  resetPage() {
    this.pageInfo.limit = this.FETCH_LIMIT;
    this.pageInfo.offset = this.FETCH_OFFSET;
    this.items = [];
  }

  getCurrentTotalItems() {
    const total = this.page * this.itemsPerPage;
    if (total > this.items?.length) {
      return this.items?.length;
    }
    return total;
  }


  async performSearch(key: string = null) {
    // get search term from disk
    if (!key) {
      key = await this.util.getSearchTermLocal();
    }

    // search for store
    this.loading = true;
    this.storeService.searchAll(key, this.pageInfo).subscribe((data: any) => {
      console.log(this.items);
      setTimeout(() => {
        this.items = this.items.concat(data);
        this.items = UtilityService.shuffle(this.items);
      }, 100);
      this.itemsEvent.emit(this.items);
      this.loading = false;
      this.pageInfo.offset += this.items.length;
    });
  }



  isLoading() {
    // return this.companyLoading || this.storeLoading || this.productLoading;
  }

  public onPageChanged(event) {
    this.page = event;
    // this.stores;
    window.scrollTo(200, 0);

    // load more items from the server
    const totalPages = Math.floor((this.Items.length / this.ItemsPerPage) + 0.4);
    if (totalPages === this.page) {
      // load more from server
      this.performSearch();
    }
  }

  sort() {
    switch (this.sortKey) {
      case 'default':
        this.sortedItems = this.items;
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
        this.sortedItems = this.items;
        break;
    }
  }

  sortByPopularity() {

  }

  sortByRating() {

  }

  sortByDate() {

  }

  sortByPrice() {

  }


  sortItems() {
    this.items = this.items.sort((a, b) => {
      return a.name.localeCompare(b.name)
    })
  }



  isStore(item: any) {
    if (item.storeId) {
      return false;
    }
    return true;
  }

}
