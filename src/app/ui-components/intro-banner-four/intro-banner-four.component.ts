import { Router } from '@angular/router';
import { PHOTO_DISPLAY_TYPES, Urls } from '../../config';
import { StoreService } from 'src/app/shared/services/store.service';
import { Component, Input, OnInit, AfterContentInit } from '@angular/core';
import { ProductCategory } from 'src/app/models';
import { UtilityService } from 'src/app/shared/services';

@Component({
  selector: 'app-intro-banner-four',
  templateUrl: './intro-banner-four.component.html',
  styleUrls: ['./intro-banner-four.component.scss']
})
export class IntroBannerFourComponent implements OnInit, AfterContentInit {
  private productCategory: ProductCategory;
  image = '';
  constructor(
    private router: Router,
    private storeService: StoreService,
    private utility: UtilityService
  ) { }


  ngAfterContentInit(): void {
    this.getImage();

  }

  ngOnInit(): void {
  }

  @Input() set ProductCategory(productCategory: ProductCategory) {
    this.productCategory = productCategory;
    this.getImage();
  }

  get ProductCategory() {
    return this.productCategory;
  }

  getImage() {
    this.image = StoreService.getPhotoUrlByDisplayTypeLocal([this.productCategory.photo], PHOTO_DISPLAY_TYPES.COVER, true, true)
  }


  goToProductCategory(key: string){
    // search with product category name 
      this.utility.setSearchKey(key);
      this.router.navigate([Urls.search])
    
  }


}
