import { Component, Input, OnInit } from '@angular/core';
import { WcProduct } from 'src/app/models/woocommerce.model';

@Component({
  selector: 'app-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.scss']
})
export class FeaturedProductsComponent implements OnInit {

  products: WcProduct[] = [];
  constructor() { }

  ngOnInit(): void {
  }


  @Input() set Products(products: WcProduct[]) {
    this.products = products;
  }

  get Products() {
    return this.products;
  }

}
