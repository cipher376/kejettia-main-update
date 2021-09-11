import { MyLocalStorageService } from './../../shared/services/local-storage.service';
import { Subscription } from 'rxjs';
import { SEARCH_PAGE_FILTER } from './../../ui-components/search-nav/search-nav.component';
import { ProductSearchComponent } from './../../ui-components/product-search/product-search.component';
import { StoreSearchComponent } from './../../ui-components/store-search/store-search.component';
import { Component, OnInit, AfterContentInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, Product } from 'src/app/models';
import { PageInfo } from 'src/app/models/page';
import { UtilityService } from 'src/app/shared/services';
import { MY_ACTION, SignalService } from 'src/app/shared/services/signal.service';
import { StoreService } from 'src/app/shared/services/store.service';
import { MixedSearchComponent } from 'src/app/ui-components/mixed-search/mixed-search.component';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, AfterContentInit, OnDestroy, AfterViewInit {
  public sortByOrder = '';   // sorting
  public page = 1;
  public tagsFilters: any[] = [];
  public viewType = 'grid';
  public viewCol = 25;
  private searchPageFilter = SEARCH_PAGE_FILTER;

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

  sub$: Subscription;

  isMobile = false;

  constructor(
    private signal: SignalService,
    private util: UtilityService,
    private storeService: StoreService,
    // private productService: ProductService,
    private fstore: MyLocalStorageService,
    ) {

     }


  ngOnDestroy(): void {
    this.sub$?.unsubscribe();

  }

  ngAfterViewInit() {
    this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (this.isMobile) {
      window.scrollTo(0,0);
    }
  }
  ngAfterContentInit(): void {
    this.signal.majorCategoryFilterSource$.subscribe(filter => {
      this.SearchPageFilter = filter;
    });
  }

  ngOnInit(): void {

  }

  set SearchPageFilter(filter: string[]) {
    setTimeout(() => {
      this.searchPageFilter = filter;
    }, 100);
  }

  get SearchPageFilter() {
    return this.searchPageFilter;
  }

}
