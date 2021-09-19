import { UtilityService } from 'src/app/shared/services';
import { UserService } from './../../shared/services/user.service';
import { Router } from '@angular/router';
import { StoreCategory } from './../../models/store-category';
import { StoreService } from './../../shared/services/store.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Urls } from 'src/app/config';

@Component({
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss']
})
export class MobileMenuComponent implements OnInit, AfterViewInit {
  loggedUser: User;

  categories: StoreCategory[];

  key: string;
  constructor(
    private storeService: StoreService,
    private router: Router,
    private userService: UserService,
    private utilityService: UtilityService
  ) { }


  ngAfterViewInit(): void {
    this.loggedUser = this.userService.getLoggedUserLocalSync();
  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.storeService.getStoreCategories().subscribe(cats => {
      this.categories = cats;
    });
  }

  search(key) {
    if (key) {
      this.utilityService.setSearchKey(key);
      this.router.navigate([Urls.search]).then(() => {
        window.location.reload();
      })
    }
  }



}
