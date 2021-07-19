import { StoreService } from 'src/app/shared/services/store.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models';
import { PageInfo } from 'src/app/models/page';
import { UtilityService } from 'src/app/shared/services';
import { SignalService, MY_ACTION } from 'src/app/shared/services/signal.service';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss']
})
export class ProductSearchComponent implements OnInit {

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

  productItems: Product[] = [];
  productItemsPerPage = 20;

  productLoading = false;
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
    this.productItems = [];
  }

  getCurrentTotalItems() {
    const total = this.page * this.productItemsPerPage;
    if (total > this.productItems?.length) {
      return this.productItems?.length;
    }
    return total;
  }

  async performSearch(key: string = null) {
    // get search term from disk
    if (!key) {
      key = await this.util.getSearchTermLocal();
    }

    // search for product
    this.productLoading = true;
    // this.storeService.searchProduct(key, this.pageInfo).subscribe((data: Product) => {
    //   this.productItems = this.productItems.concat(data);
    //   this.productLoading = false;
    //   this.pageInfo.offset += this.productItems.length;

    // });

  }

  isLoading() {
    return this.companyLoading || this.productLoading || this.productLoading;
  }

  public onPageChanged(event) {
    this.page = event;
    // this.products;
    window.scrollTo(200, 0);

    // load more productItems from the server
    const totalPages = Math.floor((this.productItems.length / this.productItemsPerPage) + 0.4);
    if (totalPages === this.page) {
      // load more from server
      this.performSearch();
    }
  }


}
