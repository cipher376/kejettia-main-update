import { Router } from '@angular/router';
import { StoreService } from 'src/app/shared/services/store.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Product, User } from 'src/app/models';
import { UserService } from 'src/app/shared/services';
import { PHOTO_DISPLAY_TYPES, Urls } from 'src/app/config';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  favProducts: Product[] = [];

  loggedUser: User;

  constructor(
    private location: Location,
    private storeService: StoreService,
    private userService: UserService,
    private router: Router
  ) { }

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
