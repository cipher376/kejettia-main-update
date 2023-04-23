import { Router } from '@angular/router';
import { StoreService } from 'src/app/shared/services/store.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';
import { Product, User } from 'src/app/models';
import { UserService } from 'src/app/shared/services';
import { PHOTO_DISPLAY_TYPES, Urls } from 'src/app/config';


@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit, AfterViewInit {
  favProducts: Product[] = [];
  isMobile = false;
  loggedUser: User;

  constructor(
    private location: Location,
    private storeService: StoreService,
    private userService: UserService,
    private router: Router
  ) { }

  ngAfterViewInit() {
    this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (this.isMobile) {
      window.scrollTo(0,2000);
      window.scrollTo(0,0);
    }
  }

  ngOnInit(): void {
    this.loggedUser = this.userService.getLoggedUserLocalSync();
    this.getWishList();
  }

  goBack() {
    this.location.back();
  }

  getWishList() {
    this.storeService.getUserWishList(this.loggedUser?.id).subscribe(products => {
      this.favProducts = products;
    });
  }

  goToProduct(product: Product) {
    this.storeService.setSelectedProductLocal(product).then(() => {
      this.router.navigateByUrl(Urls.productDetails + '/' + product?.id);
      // window.location.href = Urls.productDetails + '/' + product?.id;
    });
  }

  getProductPhoto(product: Product) {
    return StoreService.getPhotoUrlByDisplayTypeLocal(product?.photos, PHOTO_DISPLAY_TYPES.COVER, true, true);
  }

  remove(prod: Product) {
    this.storeService.removeProductFromWishList(prod?.id, this.loggedUser?.id).subscribe(()=>{
      this.getWishList();
    });
  }


}
