import { Urls } from 'src/app/config';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { User } from 'src/app/models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  loggedUser: User = new User();
  isMobile= false;
  constructor(
    private userService: UserService,
    private router: Router
  ) {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.loggedUser = this.userService.getLoggedUserLocalSync();
    }, 100);

    this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

  }

  ngOnInit(): void {
  }

  goToWishlist(){
    this.router.navigateByUrl(Urls.wishlist);
  }

}
