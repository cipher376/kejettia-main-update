import { UserService } from './../../shared/services/user.service';
import { StoreService } from 'src/app/shared/services/store.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { User } from 'src/app/models';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, AfterViewInit {
  loggedUser: User;
  isMobile = false;

  constructor(
    private storeService: StoreService,
    private userService: UserService
  ) { }


  ngAfterViewInit() {
    this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (this.isMobile) {
      window.scrollTo(0,0);
    }
  }

  ngOnInit(): void {
    this.loggedUser = this.userService.getLoggedUserLocalSync();
    this.storeService.getUserWishList(this.loggedUser?.id).subscribe(()=>{});
  }

}
