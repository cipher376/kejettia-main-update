import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Urls } from 'src/app/config';

declare var $: any;
declare var Window: any;

@Component({
  selector: 'app-cart-mini',
  templateUrl: './cart-mini.component.html',
  styleUrls: ['./cart-mini.component.scss']
})
export class CartMiniComponent implements OnInit {

  constructor(
    private router: Router
  ) {
    Window = window;
   }

  ngOnInit(): void {

  }


  goToCart(){
    this.router.navigateByUrl(Urls.cart)
  }

  goToCheckOut(){
    this.router.navigateByUrl(Urls.checkout)
  }

}
