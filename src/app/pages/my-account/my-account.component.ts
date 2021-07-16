import { Urls } from 'src/app/config';
import { Router } from '@angular/router';
import { MyAuthService } from 'src/app/shared/services';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {

  constructor(
    private auth: MyAuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }


  logOut(){
    this.auth.logout();

  }

}
