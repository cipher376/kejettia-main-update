import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Urls } from 'src/app/config';



@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }


  goToCheckOut(){
    this.router.navigateByUrl(Urls.checkout);
  }

}
