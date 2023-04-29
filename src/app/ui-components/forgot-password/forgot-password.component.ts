import { MyAuthService } from 'src/app/shared/services';
import { UserService } from './../../shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { SimpleModalService } from 'ngx-simple-modal';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  email: string;
  recaptcha_value='';
  recaptchafailed = false;

  constructor(
    private auth: MyAuthService,
    private modal: SimpleModalService

  ) { }

  ngOnInit(): void {
  }

  resolveRecaptcha($e){
    this.recaptcha_value = $e;
    if(this.recaptcha_value){
      this.recaptchafailed = false;
    }
  }


  passwordResetRequest() {
    if(!this.recaptcha_value){
      alert(`Please click "I'm not a robot" for verification`);
      this.recaptchafailed = true;
      return;
    }
    if(!this.email){
      alert('Complete all fields')
      return;
    }
    this.auth.requestPasswordResetLink(this.email).subscribe(t => {
      // console.log(t);
      let disposable = this.modal.addModal(AlertComponent, {
        title: 'Password reset',
        message: 'Reset link sent to the email address'
      }).subscribe(() => {
        setTimeout(() => {
          disposable.unsubscribe();
        }, 100);
      })

    });
  }


}
