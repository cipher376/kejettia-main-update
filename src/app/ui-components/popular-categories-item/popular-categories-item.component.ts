import { Router } from '@angular/router';
import { NO_IMAGE } from './../../config';
import { environment } from 'src/environments/environment';
import { Component, Input, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/models';

@Component({
  selector: 'app-popular-categories-item',
  templateUrl: './popular-categories-item.component.html',
  styleUrls: ['./popular-categories-item.component.scss']
})
export class PopularCategoriesItemComponent implements OnInit {
  productCategory = new ProductCategory();

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  @Input() set ProductCategory(cat: ProductCategory) {
    this.productCategory = cat;
  }
  getCatPhoto() {
    if (this.productCategory?.photo) {
      return environment.file_api_download_url_root + this.productCategory?.photo?.source;
    }
    return NO_IMAGE;
  }

  search() {
    this.router.navigateByUrl('/main/pages/search;cat=' + this.productCategory?.name).then(()=>{
      window.location.reload();
    })
  }
}
