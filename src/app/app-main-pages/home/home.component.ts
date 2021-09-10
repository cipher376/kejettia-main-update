import { UserService } from './../../shared/services/user.service';
import { StoreService } from './../../shared/services/store.service';
import { Component, OnInit, AfterContentInit, AfterViewInit } from '@angular/core';
import { Product, ProductCategoryItem, Store, StoreCategory, User } from 'src/app/models';
import { UtilityService } from 'src/app/shared/services';

declare var $: any;
declare var Window: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterContentInit, AfterViewInit {
  private stores: Store[] = [];
  private storeCategories: StoreCategory[] = [];
  private productCategoryItems: ProductCategoryItem[] = [];
  private wishList: Product[] = [];
  private loggedUser: User;

  premiumStores: Store[] = [];

  showLoader = true;
  isStoreCategoriesShuffled = true;

  private loaderCount = 0;
  constructor(
    private storeService: StoreService,
    private userService: UserService
  ) {
    Window = window;
  }


  ngAfterViewInit(): void {
    this.showLoader = true;
    this.loaderCount = 0;

    this.loadPremiumStores();
    this.getStoreCategories();
    this.getProductCategoryItems();

    // load wishlist from disk
    if (this.loggedUser) {
      this.wishList = this.storeService.getWishListLocalSync();
    }

  }


  ngAfterContentInit(): void {
  }

  ngOnInit(): void {
    this.loggedUser = this.userService.getLoggedUserLocalSync();
    this.loadWisList();
  }

  set StoreCategories(cat: StoreCategory[]) {
    if (cat && !this.isStoreCategoriesShuffled) {
      console.log(cat);
      this.isStoreCategoriesShuffled = true;
      this.storeCategories = UtilityService.shuffle(cat);
    }
  }

  get StoreCategories() {
    return this.storeCategories;
  }

  set LoaderCount(c: number) {
    this.loaderCount += c;
    if (this.loaderCount >= 3) {
      this.showLoader = false;
      dispatchEvent(new Event('load'));
      dispatchEvent(new Event('mousewheel'));
      $('.main').hide().show(0);
      window.scrollTo(0, 10)
      setTimeout(() => {
        window.scrollTo(0, 0)
      }, 100);
    }
  }
  get LoaderCount() {
    return this.loaderCount;
  }

  set ProductCategoryItems(cats: ProductCategoryItem[]) {
    this.productCategoryItems = cats;
    console.log(cats);
  }

  get ProductCategoryItems() {
    return this.productCategoryItems;
  }

  get MainCarouselCategories() {
    return this.storeCategories.slice(0, 5)
  }


  getStoreCategories() {
    this.isStoreCategoriesShuffled = false;
    this.storeService.getStoreCategories()?.subscribe(categories => {
      this.storeCategories = categories;
      if (categories && !this.isStoreCategoriesShuffled) {
        this.isStoreCategoriesShuffled = true;
        this.storeCategories = UtilityService.shuffle(categories);
      }
      this.LoaderCount += 1;
      // console.log(categories);
    })
  }

  getProductCategoryItems() {
    this.storeService.getProductCategoryItems()?.subscribe(cats => {
      this.LoaderCount += 1;
      this.productCategoryItems = cats;
      // console.log(cats);
    })
  }

  loadPremiumStores() {
    this.storeService.getPremiumStores()?.subscribe(stores => {
      this.premiumStores = UtilityService.shuffle(stores).slice(0, 3);
      this.LoaderCount += 1;
      // console.log(this.premiumStores);
    });
  }


  loadWisList() {
    this.storeService.getUserWishList(this.loggedUser?.id)?.subscribe(prods => {
      this.wishList = prods;
    })
  }

}
