import { UtilityService } from 'src/app/shared/services';
import { Router } from '@angular/router';
import { ProductBrand } from './../../models/product';
import { StoreService } from './../../shared/services/store.service';
import { Component, OnInit } from '@angular/core';
import { Urls } from 'src/app/config';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {

  brands: ProductBrand[] = [];

  constructor(
    private storeService: StoreService,
    private router: Router,
    private utilityService: UtilityService
  ) { }

  ngOnInit() {
    this.getBrands();
  }

  getBrands() {
    this.storeService.getProductBrands().subscribe(brands => {
      this.brands = brands;
    })
  }

  search(key: string) {
    this.utilityService.setSearchKey(key);
    this.router.navigate([Urls.search])
  }

}
