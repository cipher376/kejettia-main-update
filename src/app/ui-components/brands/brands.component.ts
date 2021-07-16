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
    private storeService: StoreService
  ) { }

  ngOnInit() {
    this.getBrands();
  }

  getBrands(){
    this.storeService.getProductBrands().subscribe(brands =>{
      this.brands = brands;
    })
  }

}
