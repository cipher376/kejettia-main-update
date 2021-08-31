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

  constructor(
    private auth: MyAuthService,
    private modal: SimpleModalService

  ) { }

  ngOnInit(): void {
  }


  passwordResetRequest() {
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
