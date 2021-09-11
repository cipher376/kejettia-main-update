import { User } from 'src/app/models';
import { Urls } from 'src/app/config';
import { Router } from '@angular/router';
import { MyAuthService } from 'src/app/shared/services';
import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit, AfterViewInit {
  loggedUser: User = new User();
  isMobile = false;

  constructor(
    private auth: MyAuthService,
    private router: Router
  ) { }


  ngAfterViewInit() {
    this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (this.isMobile) {
      window.scrollTo(0,0);
    }
  }
  ngOnInit(): void {
  }


  logOut(){
    this.auth.logout();

  }

}
