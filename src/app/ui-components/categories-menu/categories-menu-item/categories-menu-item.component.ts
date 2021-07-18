import { ProductCategory, StoreCategory } from 'src/app/models';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories-menu-item',
  templateUrl: './categories-menu-item.component.html',
  styleUrls: ['./categories-menu-item.component.scss']
})
export class CategoriesMenuItemComponent implements OnInit {
  private category: StoreCategory = new StoreCategory();
  selectedCategory1: ProductCategory = new ProductCategory();
  selectedCategory2: ProductCategory = new ProductCategory();
  constructor() { }

  ngOnInit(): void {
  }

  @Input() set Category(cat: StoreCategory) {
    this.category = cat;
    this.setProductCategories()
  }

  get Category() {
    return this.category;
  }


  setProductCategories() {
    if ((this.category?.productCategories ?? []).length > 0)
      this.selectedCategory1 = this.category.productCategories[0];
    if ((this.category?.productCategories ?? []).length > 1)
      this.selectedCategory2 = this.category.productCategories[1];
  }

}
