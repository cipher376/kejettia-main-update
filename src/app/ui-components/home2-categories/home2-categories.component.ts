import { Urls } from './../../config';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/shared/services/store.service';
import { UtilityService } from './../../shared/services/utility.service';
import { Product, ProductCategory } from './../../models/product';
import { StoreCategory } from './../../models/store-category';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-home2-categories',
  templateUrl: './home2-categories.component.html',
  styleUrls: ['./home2-categories.component.scss']
})
export class Home2CategoriesComponent implements OnInit {

  private categories: ProductCategory[] = [];

  constructor(
    private storeService: StoreService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }


  @Input() set Categories(cats: any) {
    let isStoreCat = false;
    for (const c of cats) {
      if (c?.productCategories) {
        isStoreCat = true;
        break;
      }
    }

    if (isStoreCat) {
      cats?.forEach((c: StoreCategory) => {
        this.categories = [...this.categories];
        if(Array.isArray(c.productCategories)){
          this.categories.push(...c.productCategories);
        }
      });
    } else {
      this.categories = cats;
    }
    this.categories = UtilityService.shuffle(this.categories);
  }

  get Categories() {
    return this.categories;
  }

  getStoreCategories() {

  }

  search(cat: any) {
    // load products of that category within the store
    const products: Product[] = [];
    if (cat?.productCategories?.length > 0) { // store category
      cat.productCategories?.forEach(pc => {
        pc.productCategoryItems.forEach(pi => {
          pi.products?.forEach(p => {
            if (!products.includes(p)) {
              products.push(p);
            }
          })
        })
      })
    } else {
      cat.productCategoryItems?.forEach(pi => { // product category
        pi.products?.forEach(p => {
          if (!products.includes(p)) {
            products.push(p);
          }
        })
      })
    }

    // navigate to the product listing page
    this.storeService.setProductsLocal(products);
    this.router.navigateByUrl(Urls.products)
  }

  goToCategories() {
    // navigate to category listing page
  }
}
