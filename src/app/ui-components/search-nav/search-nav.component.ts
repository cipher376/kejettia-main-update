import { MyLocalStorageService } from './../../shared/services/local-storage.service';
import { SignalService } from 'src/app/shared/services/signal.service';
import { Component, EventEmitter, Input, OnInit, Output, AfterContentInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { UtilityService } from 'src/app/shared/services';
import { ActivatedRoute } from '@angular/router';

export const SEARCH_PAGE_FILTER = ['store', 'product'] //['store', 'product', 'company']

declare var $: any;
declare var Window: any;
@Component({
  selector: 'app-search-nav',
  templateUrl: './search-nav.component.html',
  styleUrls: ['./search-nav.component.scss']
})
export class SearchNavComponent implements OnInit, AfterContentInit, AfterViewInit {

  isMobile = false;
  fromMenu = false; // navigation from mobile menu, trigger filter;

  private searchPageFilter = [];

  @Output() searchPageFilterEvent = new EventEmitter<any>();

  constructor(
    private signal: SignalService,
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute,
    private fstore: MyLocalStorageService,
  ) {
    this.searchPageFilter = SEARCH_PAGE_FILTER;
    Window = window;
    Window.this = this;
    this.route.params.subscribe(params => {
      // console.log(params)
      this.fromMenu = params.fromMenu;
      // console.log(this.fromMenu);
    })
    this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  }

  ngAfterViewInit(): void {
  }


  ngAfterContentInit(): void {

    $(document).ready(function () {
      console.log(Window.this.fromMenu);
      setTimeout(() => {
        Window.Riode.sidebar('sidebar'); // Initialize left sidebar
        if (Window.this.isMobile && Window.this.fromMenu) {
          $('.home').addClass('sidebar-active');
        }
      }, 500);


      $('.left-sidebar-toggle').click(() => {
        Window.Riode.sidebar('sidebar'); // Initialize left sidebar
        setTimeout(() => {
          if (Window.this.isMobile) {
            if (Window.this.fromMenu)
              $('.home').addClass('sidebar-active');
          } else {
            if ($('.home').hasClass('sidebar-active')) {
              $('.home').removeClass('sidebar-active');
            } else {
              $('.home').addClass('sidebar-active');
            }
          }

        }, 500);

      })
    });


  }

  ngOnInit() {
    // this.signal.announceMajorCategoryFilterChanged(this.searchPageFilter);
    this.fstore.setObjectSync('filter', this.SearchPageFilter);
    Window.Riode.sidebar('sidebar'); // Initialize left sidebar
    Window.Riode.sidebar('right-sidebar'); // Initialize right sidebar
    Window.Riode.sidebar('top-sidebar'); // Initialize right sidebar


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

  toggleFilter() {
    console.log($('.home'))

  }


}
