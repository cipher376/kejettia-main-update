import { Route } from '@angular/compiler/src/core';
import { Urls } from 'src/app/config';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/shared/services';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MY_ACTION, SignalService } from 'src/app/shared/services/signal.service';
import { StoreService } from 'src/app/shared/services/store.service';
import { WcProduct } from 'src/app/models/woocommerce.model';
import { User } from 'src/app/models';
import { WooCommerceStoreService } from 'src/app/shared/services/wc-store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  loggedUser: User = new User();
  isMobile = false;

  logUrl = 'assets/images/logo.svg';

  wishList: WcProduct[] = [];;
  constructor(
    private userService: UserService,
    private router: Router,
    private signal: SignalService,
    private storeService: StoreService,
    private wcStoreService: WooCommerceStoreService,
    private route: ActivatedRoute
  ) {
    // this.route.params.subscribe(p=>{
    //   if (this.router.url.indexOf(Urls.businessPage) > -1) {
    //     this.logUrl = 'assets/images/kbusiness.svg'
    //   } else {
    //     this.logUrl = 'assets/images/logo.svg';

    //   }
    // })
    // this.route.url.subscribe(url => {

    // })
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
        this.wishList = this.wcStoreService.getWishListLocalSync();
      }
    })


  }

  goToWishlist() {
    this.router.navigateByUrl(Urls.wishlist);
  }

}
