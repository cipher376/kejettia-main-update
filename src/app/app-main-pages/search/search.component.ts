import { ProductSearchComponent } from './../../ui-components/product-search/product-search.component';
import { StoreSearchComponent } from './../../ui-components/store-search/store-search.component';
import { Component, OnInit, AfterContentInit, ViewChild } from '@angular/core';
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
export class SearchComponent implements OnInit, AfterContentInit {
  public sortByOrder = '';   // sorting
  public page = 1;
  public tagsFilters: any[] = [];
  public viewType = 'grid';
  public viewCol = 25;
  public searchPageFilter = 'mixed'; //store, product, company, service

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

  @ViewChild(MixedSearchComponent) mixedSearch: MixedSearchComponent;
  @ViewChild(StoreSearchComponent) storeSearch: StoreSearchComponent;
  @ViewChild(ProductSearchComponent) productSearch: ProductSearchComponent;


  constructor(
    private signal: SignalService,
    private util: UtilityService,
    private storeService: StoreService,
    // private productService: ProductService,
    private route: ActivatedRoute
  ) {
  }


  ngAfterContentInit(): void {
  }

  ngOnInit(): void {
  }


}
