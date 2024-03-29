import { UtilityService } from 'src/app/shared/services';
import { Router } from '@angular/router';
import { ProductCategory, StoreCategory } from 'src/app/models';
import { Component, Input, OnInit } from '@angular/core';
import { Urls } from 'src/app/config';

@Component({
  selector: 'app-categories-menu-item',
  templateUrl: './categories-menu-item.component.html',
  styleUrls: ['./categories-menu-item.component.scss']
})
export class CategoriesMenuItemComponent implements OnInit {
  private category: StoreCategory = new StoreCategory();
  selectedCategory1: ProductCategory = new ProductCategory();
  selectedCategory2: ProductCategory = new ProductCategory();

  constructor(
    private router: Router,
    private utilityService: UtilityService
  ) { }

  ngOnInit(): void {
  }

  @Input() set Category(cat: StoreCategory) {
    this.category = cat;
    this.setProductCategories()
  }

  get Category() {
    return this.category;
  }

  goToSearch(){
    this.utilityService.setSearchKey(this.category?.name);
    this.router.navigate([Urls.search])
  }


  setProductCategories() {
    if ((this.category?.productCategories ?? []).length > 0)
      this.selectedCategory1 = this.category.productCategories[0];
    if ((this.category?.productCategories ?? []).length > 1)
      this.selectedCategory2 = this.category.productCategories[1];
  }

}
