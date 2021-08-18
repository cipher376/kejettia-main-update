import { NO_IMAGE } from './../../config';
import { environment } from './../../../environments/environment';
import { ProductBrand } from './../../models/product';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-brands-horizontal',
  templateUrl: './brands-horizontal.component.html',
  styleUrls: ['./brands-horizontal.component.scss']
})
export class BrandsHorizontalComponent implements OnInit {
  private brands: ProductBrand[] = [];
  fileUrl = environment.file_api_download_url_root;

  constructor() { }

  ngOnInit(): void {
  }


  @Input() set Brands(brands: ProductBrand[]) {
    this.brands = brands;
  }

  getPhoto(brand: ProductBrand) {
    if (brand?.photo)
      return this.fileUrl + (brand?.photo?.thumbnail ?? brand?.photo?.source);
    return NO_IMAGE;
  }
}
