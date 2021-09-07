import { Urls } from './../../config';
import { MyAuthService } from 'src/app/shared/services';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Credentials } from 'src/app/models';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  _isPassword = false;
  _isMatch = false;

  public changePassForm: FormGroup = this.fb.group({});
  public credentials: Credentials = new Credentials;
  private token = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: MyAuthService,
    private router: Router
  ) {
    this.token = this.route.snapshot.paramMap.get('token');
    this.createChangePassForm()
  }

  ngOnInit(): void {
  }


  getData() {
    if (this.token && this.credentials) {
      this.credentials.password = this.changePassForm?.value.reg_password;
      this.credentials.token = this.token;
    }
    if (!this._isPassword) {
      return false;
    }

    if (!this._isMatch) {
      return false;
    }
    return true;
  }

  onValidate(value: string) {
    // console.log(value);
    switch (value) {
      case 'password':
        // test strength
        const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');
        if (this.changePassForm?.value.reg_password?.match(strongRegex)) {
          this._isPassword = true;
        } else {
          this._isPassword = false;
        }

        if (this.changePassForm?.value.reg_password === this.changePassForm?.value.reg_password2) {
          this._isMatch = true;
        } else {
          this._isMatch = false;
        }
        break;
      case 'password2':
        if (this.changePassForm?.value.reg_password === this.changePassForm?.value.reg_password2) {
          this._isMatch = true;
        } else {
          this._isMatch = false;
        }
        break;
    }
  }

  createChangePassForm() {
    this.changePassForm = this.fb.group({
      reg_password: [
        '',
        [Validators.required, Validators.minLength(5), Validators.maxLength(100)]
      ],
      reg_password2: [
        '',
        [Validators.required, Validators.minLength(5), Validators.maxLength(100)]
      ]
    });
  }

  changePassword() {
    console.log(this.credentials)
    if (!this.getData()) {
      alert("Please check your password");
      return undefined;
    }
    this.authService.changePassword(this.credentials).subscribe((res: any) => {
      console.log(res);
      if (!res) {
        alert('Token has expired. Please request for new reset link');
      }
      if (res?.status == 'success') {
        alert("Password change successful");
        this.router.navigateByUrl(Urls.login);
      } else {
        alert("We were not able to change your password");
      }
    })
  }

}
