import { UtilityService } from 'src/app/shared/services';
import { StoreService } from './../../shared/services/store.service';
import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/models';

@Component({
  selector: 'app-popular-categories',
  templateUrl: './popular-categories.component.html',
  styleUrls: ['./popular-categories.component.scss']
})
export class PopularCategoriesComponent implements OnInit {
  productCategories: ProductCategory[] = [];

  constructor(
    private storeService: StoreService
  ) { }

  ngOnInit(): void {
    this.getProductCategories();
  }

  getProductCategories(){
    this.storeService.getProductCategories().subscribe(cats => {
      this.productCategories = UtilityService.shuffle(cats);
    })
  }

}
