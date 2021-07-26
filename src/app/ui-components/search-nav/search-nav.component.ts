import { MyLocalStorageService } from './../../shared/services/local-storage.service';
import { SignalService } from 'src/app/shared/services/signal.service';
import { Component, EventEmitter, Input, OnInit, Output, AfterContentInit, ChangeDetectorRef } from '@angular/core';
import { UtilityService } from 'src/app/shared/services';

export const SEARCH_PAGE_FILTER = ['store', 'product'] //['store', 'product', 'company']

declare var $: any;
@Component({
  selector: 'app-search-nav',
  templateUrl: './search-nav.component.html',
  styleUrls: ['./search-nav.component.scss']
})
export class SearchNavComponent implements OnInit, AfterContentInit {

  private searchPageFilter = [];

  @Output() searchPageFilterEvent = new EventEmitter<any>();

  constructor(
    private signal: SignalService,
    private cd: ChangeDetectorRef,
    private fstore: MyLocalStorageService
  ) {
    this.searchPageFilter = SEARCH_PAGE_FILTER;
  }


  ngAfterContentInit(): void {
    // $('body').on('click', 'a', function (e) {
    //   e.preventDefault();
    // });
  }

  ngOnInit() {
    // this.signal.announceMajorCategoryFilterChanged(this.searchPageFilter);
    this.fstore.setObjectSync('filter', this.SearchPageFilter);

  }

  set SearchPageFilter(filter: string[]) {
      this.searchPageFilter = [...filter];
  }

  get SearchPageFilter() {
    return this.searchPageFilter;
  }

  setAll() {
    if (this.searchPageFilter.length > 0) {
      this.SearchPageFilter = [];
      $('.shops').removeClass('active');
      $('.products').removeClass('active');
      $('.company').removeClass('active');
      $('.all').removeClass('active');

    } else if (this.searchPageFilter.length == 0) {
      this.SearchPageFilter = SEARCH_PAGE_FILTER;
      $('.shops').addClass('active');
      $('.products').addClass('active');
      $('.company').addClass('active');
      $('.all').addClass('active');
    }
    this.signal.announceMajorCategoryFilterChanged(this.searchPageFilter);
    // update UI
    // console.log(this.searchPageFilter)
  }

  setShops() {
    // if include remove else add
    if (this.searchPageFilter.includes('store')) {
      this.SearchPageFilter = UtilityService.arrayRemove(this.SearchPageFilter, 'store')
      $('.shops').removeClass('active');
    } else {
      this.SearchPageFilter.push('store');
      $('.shops').addClass('active');
    }
    this.signal.announceMajorCategoryFilterChanged(this.searchPageFilter);

  }

  setProducts() {
    // if include remove else add
    if (this.searchPageFilter.includes('product')) {
      this.SearchPageFilter = UtilityService.arrayRemove(this.SearchPageFilter, 'product')
    } else {
      this.SearchPageFilter.push('product');
    }
    this.signal.announceMajorCategoryFilterChanged(this.searchPageFilter);
    $('.products').toggleClass('active');

  }

  setCompanies() {
    // if include remove else add
    if (this.searchPageFilter.includes('company')) {
      this.SearchPageFilter = UtilityService.arrayRemove(this.SearchPageFilter, 'company')
    } else {
      this.SearchPageFilter.push('company');
    }
    this.signal.announceMajorCategoryFilterChanged(this.searchPageFilter);
    $('.company').toggleClass('active');


  }


}
