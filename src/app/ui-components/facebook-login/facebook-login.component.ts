import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-facebook-login',
  templateUrl: './facebook-login.component.html',
  styleUrls: ['./facebook-login.component.scss'],
})
export class FacebookLoginComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.initSdk();
  }

  async initSdk() {
    window['fbAsyncInit'] = function () {
      FB.init({
        appId: '145228670925090',
        cookie: true,
        xfbml: true,
        version: 'v16.0',
      });

      // auto authenticate with the api if already logged in with facebook
      FB.getLoginStatus(({ authResponse }) => {
        console.log(authResponse);
      });
    };

    // load facebook sdk script
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  }

  onFacebookButtonClicked() {
    FB.getLoginStatus((response) => {
      if (response.status === 'connected') {
        console.log('Already logged in')
      } else {
        FB.login(
          (loginResponse) => {
            console.log(loginResponse);
          },
          { scope: 'public_profile,email' }
        );
      }
    });
  }

  getUserprofileDetails(token: any) {
    FB.api(
      '/v16.0/me',
      'get',
      { access_token: token, fields: 'id,name,email' },
      (res) => {
        console.log(res);
      }
    );
  }
}
