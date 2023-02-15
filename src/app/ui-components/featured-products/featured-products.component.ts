import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models';

@Component({
  selector: 'app-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.scss']
})
export class FeaturedProductsComponent implements OnInit, AfterViewInit {

  products: Product[] = [];
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    
  }

  @Input() set Products(products: Product[]) {
    this.products = products;
    
  }

  get Products() {
    return this.products;
  }

}
