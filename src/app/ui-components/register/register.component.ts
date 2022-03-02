import { MessageService } from './../../shared/services/message.service';
import { Urls } from 'src/app/config';
import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User, Credentials } from 'src/app/models';
import { MyAuthService, UserService } from 'src/app/shared/services';
import { SignalService, MY_ACTION } from 'src/app/shared/services/signal.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Message } from 'src/app/models/message';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public regForm: FormGroup = this.fb.group({});

  _isName = false;
  _isEmail = false;
  _isPhone = false;
  _isPassword = false;
  _isMatch = false;

  public selectedUser?: User;
  public credentials: Credentials = new Credentials;

  errorMsg = '';

  @Input() isBusinessRequest = false;

  constructor(
    private fb: FormBuilder,
    private toaster: ToastrService,
    private auth: MyAuthService,
    private signal: SignalService,
    private userService: UserService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.createRegForm();

  }

  ngOnInit() {
    this.selectedUser = this.userService.getSelectedUserLocalSync()
  }

  async onRegister() {
    this.errorMsg = '';
    if (!this.getData()) {
      this.errorMsg = 'Complete all required fields';
      return;
    }

    this.auth.signUp(this.credentials).subscribe(res => {
      console.log(res);
      this.selectedUser = res as User;

      // set selected user on local disk
      this.userService.setSelectedUserLocal(this.selectedUser);
      if (this.selectedUser?.id) {
        // this.toaster.info('Please check your inbox to verify your email');
        // inform other UI components to update
        this.signal.sendAction(MY_ACTION.reloadUser);
        if (this.isBusinessRequest) {
          this.sendBusinessRequestMail();
          setTimeout(() => {
            this.router.navigateByUrl(Urls.login)
          }, 10000);
        } else {
          this.router.navigateByUrl(Urls.login)
        }
      }
    },
      (error: any) => {
        console.log(error);
        if (error?.toString().indexOf('in use') > -1) {
          this.errorMsg = 'Email is already in use!';
        } else if (error.toString().indexOf('verified') > -1) {
          this.errorMsg = `Email is not verified. A verification link is sent to ` +
            this.selectedUser?.email +
            ` but it may take up 3min to show up. check spam if not in your In-box`
          this.createRegForm();
        } else {
          this.errorMsg = 'Check your email, password or phone number';
        }
      });
  }

  getData() {
    if (!this.regForm?.value.agreement) {
      this.errorMsg = 'You must agree to the terms and conditions';
      // console.log('Agree')
      return false;
    }
    if (this.credentials) {
      this.credentials.firstName = this.regForm?.value.firstName;
      this.credentials.lastName = this.regForm?.value.lastName;
      this.credentials.otherName = this.regForm?.value.otherName ?? '';
      this.credentials.email = this.regForm?.value.reg_email;
      this.credentials.phone = this.regForm?.value.reg_phone;
      this.credentials.password = this.regForm?.value.reg_password;
    }
    if (!this._isPassword) {
      return false;
    }
    if (!this._isPhone) {
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
      case 'email':
        const emailRe = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/igm;
        if (this.regForm?.value.reg_email?.match(emailRe)) {
          this._isEmail = true;
        } else {
          this._isEmail = false;
        }
        break;
      case 'phone':
        const re1 = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        const re2 = /^\d{10}$/;
        const re3 = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
        const re4 = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        if (this.regForm?.value?.reg_phone?.match(re1) ||
          this.regForm?.value?.reg_phone?.match(re2) ||
          this.regForm?.value?.reg_phone?.match(re3) ||
          this.regForm?.value?.reg_phone?.match(re4)) {
          this._isPhone = true;
          console.log(true);
        } else {
          this._isPhone = false;
        }
        break;
      case 'password':
        // test strength
        const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');
        if (this.regForm?.value.reg_password?.match(strongRegex)) {
          this._isPassword = true;
        } else {
          this._isPassword = false;
        }

        if (this.regForm?.value.reg_password === this.regForm?.value.reg_password2) {
          this._isMatch = true;
        } else {
          this._isMatch = false;
        }
        break;
      case 'password2':
        if (this.regForm?.value.reg_password === this.regForm?.value.reg_password2) {
          this._isMatch = true;
        } else {
          this._isMatch = false;
        }
        break;
    }
  }


  createRegForm() {
    this.regForm = this.fb.group({
      firstName: [
        this.credentials.firstName,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100)
        ]
      ],
      lastName: [
        this.credentials.lastName,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100)
        ]
      ],
      otherName: [
        this.credentials.otherName,
        [
          Validators.maxLength(100)
        ]
      ],
      reg_email: [
        this.credentials.email,
        [
          Validators.required,
          Validators.email,
          Validators.minLength(6),
          Validators.maxLength(30)
        ]
      ],
      reg_password: [
        '',
        [Validators.required, Validators.minLength(5), Validators.maxLength(100)]
      ],
      reg_password2: [
        '',
        [Validators.required, Validators.minLength(5), Validators.maxLength(100)]
      ],
      reg_phone: [
        this.credentials.phone,
        [Validators.required, Validators.minLength(5), Validators.maxLength(100)]
      ],
      agreement: [
        false,
        [Validators.required, Validators.minLength(5), Validators.maxLength(100)]
      ]
    });
  }


  sendBusinessRequestMail() {
    const message = new Message();
    message.from = this.credentials?.email;
    message.to = 'customerservice@kejettia.com';
    message.fullname = this.credentials.firstName + ' ' + this.credentials.lastName + ' ' + this.credentials.otherName;
    message.subject = "Request for business account";
    message.content = 'I would like to have a business account with Kejettia.com';
    message.phone = this.credentials.phone;

    this.messageService.sendMessage(message).subscribe(m => {
      if (m) {
        this.toaster.success('A customer service representative will contact you shortly. Thank');
      }
    })
  }
}
