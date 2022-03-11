import { Urls } from 'src/app/config';
import { UserService } from 'src/app/shared/services';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models';

@Component({
  selector: 'app-sticky-footer',
  templateUrl: './sticky-footer.component.html',
  styleUrls: ['./sticky-footer.component.scss']
})
export class StickyFooterComponent implements OnInit, AfterViewInit {
  isMobile = false;
  loggedUser: User;

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }


  ngAfterViewInit() {
    this.loggedUser = this.userService.getLoggedUserLocalSync();
    this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (this.isMobile) {
      window.scrollTo(0, 0);
    }

  }
  openMenuCategories() {
    // navigate to search and then open filter
    this.router.navigateByUrl(Urls.search+';fromMenu=true');
  }

}
