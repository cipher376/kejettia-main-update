import { UserService } from './../../shared/services/user.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models';
import { MyAuthService } from 'src/app/shared/services';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})
export class EmailVerificationComponent implements OnInit, AfterViewInit {
  token = '';
  isVerified = false;
  loggedUser: User;

  showLoader = false;

  constructor(
    private route: ActivatedRoute,
    private authService: MyAuthService,
    private router: Router,
    private userService: UserService
  ) {
    this.token = this.route.snapshot.paramMap.get('token');
  }


  ngAfterViewInit(): void {
    this.loggedUser = this.userService.getLoggedUserLocalSync();
    if (this.loggedUser?.emailVerified) {
      this.isVerified = true;
    }
    this.verifyEmail();
  }

  ngOnInit(): void {

  }


  verifyEmail() {
    if (!this.loggedUser?.emailVerified && this.token) {
      this.showLoader = true;
      this.authService.verifyEmail(this.token).subscribe((res: any) => {
        if (res?.status == 'success') {
          this.isVerified = true;
          this.loggedUser.emailVerified = true;
          this.userService.setLoggedUserLocalSync(this.loggedUser);
        }
        this.showLoader = false;
      })
    }
  }
}
