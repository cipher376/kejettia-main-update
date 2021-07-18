import { NO_IMAGE } from './../../config';
import { environment } from 'src/environments/environment';
import { StoreService } from './../../shared/services/store.service';
import { Component, Input, OnInit } from '@angular/core';
import { StoreCategory } from 'src/app/models';

@Component({
  selector: 'app-main-carousel',
  templateUrl: './main-carousel.component.html',
  styleUrls: ['./main-carousel.component.scss']
})
export class MainCarouselComponent implements OnInit {

  private storeCategories: StoreCategory[] = [];

  constructor(
    private storeService: StoreService
  ) { }

  ngOnInit(): void {
  }

  @Input() set StoreCategories(cats: StoreCategory[]) {
    this.storeCategories = cats;
    console.log(cats);
  }

  get StoreCategories() {
    return this.storeCategories;
  }


  getPhotoUrl(cat: StoreCategory) {
    if (cat?.photo)
      return environment.file_api_download_url_root + cat?.photo?.source;
    return NO_IMAGE
  }

}
