import { ProductCategory } from './../../models/product';
import { Component, Input, OnInit } from '@angular/core';
import { StoreCategory } from 'src/app/models';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home2-category-badge',
  templateUrl: './home2-category-badge.component.html',
  styleUrls: ['./home2-category-badge.component.scss']
})
export class Home2CategoryBadgeComponent implements OnInit {

  private category: StoreCategory | ProductCategory;

  fileUrl = environment.file_api_download_url_root;

  constructor() { }

  ngOnInit(): void {
  }

  @Input() set Category(category: StoreCategory | ProductCategory) {
    this.category = category;
  }
  get Category() {
    return this.category;
  }

  shopNow(){

  }
}
