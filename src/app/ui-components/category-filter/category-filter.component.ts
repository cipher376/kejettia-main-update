import { Urls } from 'src/app/config';
import { StoreCategory } from './../../models/store-category';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/shared/services/store.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UtilityService } from 'src/app/shared/services';

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.scss']
})
export class CategoryFilterComponent implements OnInit, AfterViewInit {
  private categories: StoreCategory[] = [];

  isMobile = false;

  constructor(
    private storeService: StoreService,
    private router: Router,
    private utilityService: UtilityService
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  ngAfterViewInit() {
    this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (this.isMobile) {
      window.scrollTo(0, 0);
    }
  }

  get Categories() {
    return this.categories;
  }

  getCategories() {
    this.storeService.getStoreCategories().subscribe(cats => {
      this.categories = cats;
    });
  }

  search(cat: StoreCategory) {
    if (cat?.productCategories?.length <=0 || !cat?.productCategories)  {
    this.utilityService.setSearchKey(cat?.name);

      this.router.navigate([Urls.search]).then(() => {
        this.utilityService.reload();
      })
    }
  }
}
