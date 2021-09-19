import { UtilityService } from 'src/app/shared/services';
import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/models';
import { Urls } from 'src/app/config';

@Component({
  selector: 'app-categories-menu-item-section',
  templateUrl: './categories-menu-item-section.component.html',
  styleUrls: ['./categories-menu-item-section.component.scss']
})
export class CategoriesMenuItemSectionComponent implements OnInit {
  private productCategory: ProductCategory = new ProductCategory();

  constructor(
    private router: Router,
    private utilityService: UtilityService
  ) { }

  ngOnInit(): void {
  }

  @Input() set ProductCategory(cat: ProductCategory){
    this.productCategory = cat;
  }
  get ProductCategory(){
    return this.productCategory;
  }

  searchCategory(){
    this.utilityService.setSearchKey(this.productCategory?.name);
    this.router.navigate([Urls.search])

  }
}
