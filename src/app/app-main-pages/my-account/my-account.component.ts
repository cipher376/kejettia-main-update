import { User } from 'src/app/models';
import { Urls } from 'src/app/config';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MyAuthService } from 'src/app/shared/services';
import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit, AfterViewInit {
  loggedUser: User = new User();
  isMobile = false;

  // page = '';

  @ViewChild('addressDiv') addressDiv: ElementRef<HTMLElement>;

  constructor(
    private auth: MyAuthService,
    private router: Router, 
    private route: ActivatedRoute
  ) { }


  ngAfterViewInit() {
    this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (this.isMobile) {
      window.scrollTo(0,0);
    }

  this.route.queryParams.subscribe(p => {
    // this.page = p?.page;
    if(p?.page == 'address'){
      setTimeout(() => {
        let el: HTMLElement = this.addressDiv.nativeElement;
        el.click();
      }, (500));
    }
    
  })
  }


  ngOnInit(): void {
  }


  logOut(){
    this.auth.logout();

  }

}
