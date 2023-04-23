import { User } from 'src/app/models';
import { Urls } from 'src/app/config';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MyAuthService } from 'src/app/shared/services';
import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss'],
})
export class MyAccountComponent implements OnInit, AfterViewInit {
  loggedUser: User = new User();
  isMobile = false;

  page = '';

  @ViewChild('dashboradDiv') dashboradDiv: ElementRef<HTMLElement>;
  @ViewChild('addressDiv') addressDiv: ElementRef<HTMLElement>;
  @ViewChild('ordersDiv') ordersDiv: ElementRef<HTMLElement>;
  @ViewChild('account') accountDiv: ElementRef<HTMLElement>;

  constructor(
    private auth: MyAuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngAfterViewInit() {
    this.isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    if (this.isMobile) {
      window.scrollTo(0, 0);
    }

    this.route.queryParams.subscribe((p) => {
      this.page = p?.page;
      // console.log(p?.page);
      if (p?.page == 'dashboard') {
        setTimeout(() => {
          let el: HTMLElement = this.dashboradDiv.nativeElement;
          el.click();
        }, 500);
      } else  if (p?.page == 'address') {
        setTimeout(() => {
          let el: HTMLElement = this.addressDiv.nativeElement;
          el.click();
        }, 500);
      }else if (p?.page == 'orders') {
        setTimeout(() => {
          let el: HTMLElement = this.ordersDiv.nativeElement;
          el.click();
        }, 500);
      } else if (p?.page == 'account') {
        setTimeout(() => {
          let el: HTMLElement = this.accountDiv.nativeElement;
          el.click();
        }, 500);
      }
    });

    if (!this.page) {
      this.route.paramMap.subscribe((p) => {
        // this.page = p?.page;
        // console.log(p?.get('page'));

        if (p?.get('page')== 'dashboard') {
          setTimeout(() => {
            let el: HTMLElement = this.dashboradDiv.nativeElement;
            el.click();
          }, 500);
        } else if (p?.get('page') === 'address') {
          setTimeout(() => {
            let el: HTMLElement = this.addressDiv.nativeElement;
            el.click();
          }, 500);
        } else if (p?.get('page') === 'orders') {
          setTimeout(() => {
            let el: HTMLElement = this.ordersDiv.nativeElement;
            el.click();
          }, 500);
        } else if (p?.get('page') === 'account') {
          setTimeout(() => {
            let el: HTMLElement = this.accountDiv.nativeElement;
            el.click();
          }, 500);
        }
      });
    }
  }

  ngOnInit(): void {}

  logOut() {
    this.auth.logout();
  }
}
