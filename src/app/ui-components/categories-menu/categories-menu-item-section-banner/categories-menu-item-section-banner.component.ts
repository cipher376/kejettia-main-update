import { environment } from 'src/environments/environment';
import { StoreCategory } from 'src/app/models';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories-menu-item-section-banner',
  templateUrl: './categories-menu-item-section-banner.component.html',
  styleUrls: ['./categories-menu-item-section-banner.component.scss']
})
export class CategoriesMenuItemSectionBannerComponent implements OnInit {
  private category: StoreCategory = new StoreCategory();
  constructor() { }

  ngOnInit(): void {
  }

  @Input() set StoreCategory(cat: StoreCategory) {
    this.category = cat;
  }
  get StoreCategory() {
    return this.category;
  }

  getCatPhoto(){
    // console.log(this.category.photo);
    if(this.category?.photo){
      return environment.file_api_download_url_root+this.category?.photo?.source;
    }
    return '';
  }

}
