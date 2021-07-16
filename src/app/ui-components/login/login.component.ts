import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Urls } from 'src/app/config';
import { User, Credentials } from 'src/app/models';
import { MyAuthService, UserService, MyLocalStorageService } from 'src/app/shared/services';

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


  constructor(
    // private _toaster: ToastrService,
    private _auth: MyAuthService,
    private _userService: UserService,
    private _localStore: MyLocalStorageService,
    private _router: Router,
    private _fb: FormBuilder,
  ) {
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
        // console.log(res);
        if ((res as any)?.user?.id) {
    window.location.href = window.location.protocol + '//' + window.location.host  + Urls.home;

          // this._router.navigateByUrl()
        } else {
          this._localStore.set('is_login', false).then(_ => { });
        }
      },
      error => {
        console.log(error);
        if (error.search('verified') > -1) {
          alert(`Email is not verified. A verification link is sent to the email provided
          but it may take up 10min to show up. check spam if not in your In-box`);
        } else {
          // this._toaster.error('Check Credentials | Network');
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

  async redirectUserToPage() {
    this._auth.isAuthenticated(); // broadcast login successful
    this._localStore.set('is_login', true).then(_ => { });
    // if social update the current user object

    window.location.href = window.location.protocol + '//' + window.location.host + '/#' + Urls.home;

  }

  gotoForgotPassword() {
    this._router.navigateByUrl('/pages/auth/forgot');
  }

  gotoRegister() {
    this._router.navigateByUrl('/pages/auth/register');
  }

}
