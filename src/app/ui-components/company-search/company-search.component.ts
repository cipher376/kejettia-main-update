import { StoreService } from 'src/app/shared/services/store.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Company } from 'src/app/models';
import { PageInfo } from 'src/app/models/page';
import { UtilityService } from 'src/app/shared/services';
import { SignalService, MY_ACTION } from 'src/app/shared/services/signal.service';

@Component({
  selector: 'app-company-search',
  templateUrl: './company-search.component.html',
  styleUrls: ['./company-search.component.scss']
})
export class CompanySearchComponent implements OnInit {

  private sortKey = ''; // sorting the companys

  public page = 1;
  public layout = 'grid'; // list

  FETCH_LIMIT = 100;
  FETCH_OFFSET = 0;

  pageInfo = {} as PageInfo;

  companyItems: Company[] = [];
  sortedCompanyItems: Company[] = [];
  companyItemsPerPage = 20;

  companyLoading = false;
  workersLoading = false;

  paramKey = '';

  public companyItemsEvent = new EventEmitter<any>();



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


  set SortKey(key: string) {
    this.sortKey = key;
    // perform sort
    this.sort();

  }
  get SortKey() {
    return this.sortKey;
  }


  set CompanyItemsPerPage(size: number) {
    this.companyItemsPerPage = size;
    this.resetPage();
    this.performSearch();
  }



  resetPage() {
    this.pageInfo.limit = this.FETCH_LIMIT;
    this.pageInfo.offset = this.FETCH_OFFSET;
    this.companyItems = [];
  }

  getCurrentTotalItems() {
    const total = this.page * this.companyItemsPerPage;
    if (total > this.companyItems?.length) {
      return this.companyItems?.length;
    }
    return total;
  }

  async performSearch(key: string = null) {
    // get search term from disk
    if (!key) {
      key = await this.util.getSearchTermLocal();
    }

    // search for strore
    this.companyLoading = true;
    this.storeService.searchCompany(key, this.pageInfo).subscribe((data: Company[]) => {
      this.companyItems = this.companyItems.concat(data);
      this.companyItemsEvent.emit(this.companyItems);
      this.companyLoading = false;
      this.pageInfo.offset += this.companyItems.length;
    });

  }

  isLoading() {
    return this.companyLoading;
  }

  public onPageChanged(event) {
    this.page = event;
    // this.companys;
    window.scrollTo(200, 0);

    // load more companyItems from the server
    const totalPages = Math.floor((this.companyItems.length / this.companyItemsPerPage) + 0.4);
    if (totalPages === this.page) {
      // load more from server
      this.performSearch();
    }
  }

  sort() {
    switch (this.sortKey) {
      case 'default':
        this.sortedCompanyItems = this.companyItems;
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
        this.sortedCompanyItems = this.companyItems;
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

}
