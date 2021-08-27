import { ProductCategory } from './../../models/product';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/shared/services/store.service';
import { Store } from 'src/app/models';

@Component({
  selector: 'app-product-category-filter',
  templateUrl: './product-category-filter.component.html',
  styleUrls: ['./product-category-filter.component.scss']
})
export class ProductCategoryFilterComponent implements OnInit {
  private categories: ProductCategory[] = [];
  private store: Store;

  constructor(
    private storeService: StoreService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  @Input() set Store(store: Store) {
    this.store = store;
    this.getCategories();
  }

  get Categories() {
    return this.categories;
  }

  getCategories() {
    this.storeService.getCategoriesByStore(this.store?.id).subscribe(cats => {
      this.categories = [];
      cats?.forEach(cat => {
        this.categories.push(...cat?.productCategories)
      })
    });
  }

  search(key) {
    // this.router.navigateByUrl('/main/pages/search;cat=' + key).then(()=>{
    //   window.location.reload();
    // })
  }

}
