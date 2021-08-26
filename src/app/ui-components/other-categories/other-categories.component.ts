import { ProductCategory, ProductCategoryItem } from './../../models/product';
import { Component, Input, OnInit } from '@angular/core';
import { NO_IMAGE } from 'src/app/config';
import { StoreCategory } from 'src/app/models';
import { StoreService } from 'src/app/shared/services/store.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-other-categories',
  templateUrl: './other-categories.component.html',
  styleUrls: ['./other-categories.component.scss']
})
export class OtherCategoriesComponent implements OnInit {

  private storeCategories: StoreCategory[] = [];
  private productCategories: ProductCategory[] = [];
  private productCategoryItems: ProductCategoryItem[] = [];
  constructor(
    private storeService: StoreService
  ) { }

  ngOnInit(): void {
  }

  @Input() set StoreCategories(cats: StoreCategory[]) {
    this.storeCategories = cats;
    console.log(cats);
  }

  get StoreCategories() {
    return this.storeCategories;
  }

  @Input() set ProductCategoryItems(cats: ProductCategoryItem[]) {
    this.productCategoryItems = cats;
    console.log(cats);
  }

  get ProductCategoryItems() {
    return this.productCategoryItems;
  }



  @Input() set ProductCategories(cats: ProductCategory[]) {
    this.productCategories = cats;
    console.log(cats);
  }
  get ProductCategories() {
    return this.productCategories;
  }



  getPhotoUrl(cat: StoreCategory) {
    if (cat?.photo)
      return environment.file_api_download_url_root + cat?.photo?.source;
    return NO_IMAGE
  }


}
