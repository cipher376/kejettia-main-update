import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
declare const gapi: any;

@Component({

  selector: 'app-google-login',
  // template: '<button class="google-signin-button" (click)="onSignIn()">Sign in with Google</button>'
  template: `
    <button class="google-signin-button" (click)="onSignIn()">
      <div class="google-signin-button__icon">
        <img src="assets/images/search.png" >
      </div>
      <div class="google-signin-button__text">
        <span>Google</span>
      </div>
    </button>
  `,

styles: [`
.google-signin-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 10em;
  height: 48px;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  border: 1px solid #ddd;
  padding: 1em;
}

.google-signin-button:hover {
  transform: translateY(-2px);
  box-shadow: 0px 6px 10px 0px rgba(0, 0, 0, 0.2);
}

.google-signin-button__icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  border-radius: 4px 0px 0px 4px;
  padding: 0.8em;
}

.google-signin-button__icon svg {
  width: 28px;
  height: 28px;
}

.google-signin-button__text {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  color: #666;
  font-size: 14px;
  font-weight: 500;
}
`] 
  
})
export class GoogleLoginComponent implements OnInit {

  private clientId = '506338606923-ln0ldqdqvo9m5h8n1m84f34gnu6loaij.apps.googleusercontent.com';
  private scope = [
    'profile',
    'email'
  ].join(' ');

  @Output() onSuccess = new EventEmitter<any>();
  @Output() onFailure = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
    gapi.load('auth2', () => {
      gapi.auth2.init({
        client_id: this.clientId,
        scope: this.scope
      });
    });
  }

  onSignIn() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signIn().then((googleUser) => {
      const profile = googleUser.getBasicProfile();
      const id_token = googleUser.getAuthResponse().id_token;
      console.log('ID Token: ' + id_token);
      console.log('Full Name: ' + profile.getName());
      console.log('Email: ' + profile.getEmail());
    });
  }

}
