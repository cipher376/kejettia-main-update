import { Component, Input, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/models';

@Component({
  selector: 'app-categories-menu-item-section',
  templateUrl: './categories-menu-item-section.component.html',
  styleUrls: ['./categories-menu-item-section.component.scss']
})
export class CategoriesMenuItemSectionComponent implements OnInit {
  private productCategory: ProductCategory = new ProductCategory();

  constructor() { }

  ngOnInit(): void {
  }

  @Input() set ProductCategory(cat: ProductCategory){
    this.productCategory = cat;
  }
  get ProductCategory(){
    return this.productCategory;
  }
}
