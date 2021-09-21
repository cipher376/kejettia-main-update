import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SimpleModalService } from 'ngx-simple-modal';
import { Urls } from 'src/app/config';
import { User, Credentials } from 'src/app/models';
import { MyAuthService, UserService, MyLocalStorageService } from 'src/app/shared/services';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  _loginForm: FormGroup;
  _user: User;

  _isName = false;
  _isEmail = false;
  _isPhone = false;
  _isPassword = false;

  errorMsg = '';


  googleAuthUrl = Urls.googleAuthUrl;
  facebookAuthUrl = Urls.facebookAuthUrl;
  twitterAuthUrl = Urls.twitterAuthUrl;


  constructor(
    private _auth: MyAuthService,
    private _localStore: MyLocalStorageService,
    private _router: Router,
    private _fb: FormBuilder,
    private route: ActivatedRoute
  ) {

    this.route.url.subscribe(url => {
      if (url?.length > 0) {
        Urls.returnUrl = this._router?.url;
      }
    });

    this._user = new User();
    this._loginForm = this._fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.minLength(6),
          Validators.maxLength(30)
        ]
      ],
      password: [
        '',
        [Validators.required, Validators.minLength(5), Validators.maxLength(100)]
      ],
      remember: [false]
    });
  }

  ngOnInit() {
  }


  async onLogin() {
    // console.log(this._loginForm);
    if (!this._loginForm.valid) {
      // this._toaster.error('Provide valid credentials');
      return;
    }

    this._auth.login(this._loginForm.value).subscribe(
      res => {
        if ((res as any)?.user?.id) {

          console.log(Urls?.returnUrl);

          if (Urls.returnUrl.search('login') < 0) {
            window.location.href = window.location.protocol + '//' + window.location.host + Urls.returnUrl;
          } else {
            window.location.href = window.location.protocol + '//' + window.location.host + Urls.home;
          }

        } else {
          this._localStore.set('is_login', false).then(_ => { });
        }
      },
      error => {
        console.log(error);
        if (error?.message?.search('verified') > -1) {
          alert(`Email is not verified. A verification link is sent to the email provided
          but it may take up 10min to show up. check spam if not in your In-box`);
        } else {

          this.errorMsg = 'Please check your email or password and try again'

        }
      }
    );
  }


  onValidate(value: string) {
    // console.log(value);
    switch (value) {
      case 'email':
        this._isEmail = true;
        break;
      case 'phone':
        this._isPhone = true;
        break;
      case 'password':
        this._isPassword = true;
        break;
    }
  }


  gotoForgotPassword() {
    this._router.navigateByUrl('/main/pages/auth/forgot');
  }

  gotoRegister() {
    this._router.navigateByUrl('/main/pages/auth/register');
  }

}


