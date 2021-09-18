import { Urls } from 'src/app/config';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Product, User } from 'src/app/models';
import { MY_ACTION, SignalService } from 'src/app/shared/services/signal.service';
import { StoreService } from 'src/app/shared/services/store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  loggedUser: User = new User();
  isMobile = false;

  wishList: Product[] = [];;
  constructor(
    private userService: UserService,
    private router: Router,
    private signal: SignalService,
    private storeService: StoreService
  ) {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.loggedUser = this.userService.getLoggedUserLocalSync();
    }, 100);

    this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

  }

  ngOnInit(): void {
    this.signal._action$.subscribe(action => {
      if (action === MY_ACTION.wish_list_changed) {
        this.wishList = this.storeService.getWishListLocalSync();
      }
    })
  }

  goToWishlist() {
    this.router.navigateByUrl(Urls.wishlist);
  }

}
