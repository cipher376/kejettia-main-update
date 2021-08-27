import { StoreCategory } from './../../models/store-category';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/shared/services/store.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.scss']
})
export class CategoryFilterComponent implements OnInit {
  private categories: StoreCategory[] = [];
  constructor(
    private storeService: StoreService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  get Categories(){
    return this.categories;
  }

  getCategories(){
    this.storeService.getStoreCategories().subscribe(cats => {
      this.categories = cats;
    });
  }

  search(key){
    this.router.navigateByUrl('/main/pages/search;cat=' + key).then(()=>{
      window.location.reload();
    })
  }
}
