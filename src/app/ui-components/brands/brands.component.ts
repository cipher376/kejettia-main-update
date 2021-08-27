import { Router } from '@angular/router';
import { ProductBrand } from './../../models/product';
import { StoreService } from './../../shared/services/store.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {

  brands: ProductBrand[] = [];

  constructor(
    private storeService: StoreService,
    private router: Router
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
    this.router.navigateByUrl('/main/pages/search;cat=' + key)
  }

}
