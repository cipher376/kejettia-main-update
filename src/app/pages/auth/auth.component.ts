import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  //UI
  page = 'login'; // login, register, forgot
  constructor(
    private route: ActivatedRoute
  ) {
    this.page = this.route.snapshot.paramMap.get('page');
    this.route.params.subscribe(params=>{
      console.log(params)
      this.page = params.page;
    })
   }

  ngOnInit(): void {
  }


  //UI


}
