import { Urls, APP_NAME, CONTACT_EMAIL, LOGO_URL, CONTACT_PAGE } from './../../config';
import { environment } from './../../../environments/environment';
import { UserService } from 'src/app/shared/services';
import { Credentials } from './../../models/user';
import { Injectable, Inject } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs/internal/observable/throwError';
// import { DateTime } from 'ionic-angular';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User, Photo, UserConfig, Token, Address, MyDevice } from 'src/app/models';
import { MyLocalStorageService, UtilityService } from '.';
import { PageInfo } from 'src/app/models/page';

@Injectable({
  providedIn: 'root'
})
export class MyAuthService {


  token?: Token;
  redirectUrl = Urls.home;

  constructor(
    private http: HttpClient,
    private store: MyLocalStorageService,
    private userService: UserService,
    private router: Router) {
    this.token = this.getToken();
  }


  // static getUserIdentityPhoto(user: User) {
  //   // console.log(user?.photos);
  //   const photo: IdentityPhoto = {} as any;
  //   user?.photos?.forEach(ph => {
  //     if (ph.profile) {
  //       ph.fileUrl = DOWNLOAD_CONTAINER + ph.fileName ?? USER_DEFAULT_PHOTO_URL;
  //       ph.thumbnailUrl = DOWNLOAD_CONTAINER + 'thumb_' + ph.fileName ?? USER_DEFAULT_PHOTO_URL;
  //       photo.profile = ph;
  //     }
  //     if (ph.coverImage) {
  //       ph.fileUrl = DOWNLOAD_CONTAINER + ph.fileName ?? USER_DEFAULT_COVER_URL;
  //       photo.cover = ph;
  //     }
  //   });

  //   if (!photo.profile && !photo?.cover) {
  //     photo.profile = new Photo();
  //     photo.profile.fileUrl = USER_DEFAULT_PHOTO_URL;
  //     photo.profile.thumbnailUrl = USER_DEFAULT_PHOTO_URL;

  //     photo.cover = new Photo();
  //     photo.cover.fileUrl = '';
  //     photo.cover.thumbnailUrl = '';
  //   }

  //   return photo;
  // }

  // static getUserProfilePhotoUrl(identityPhoto: IdentityPhoto) {
  //   return identityPhoto?.profile?.thumbnailUrl || USER_DEFAULT_PHOTO_URL;
  // }

  // static getUserCoverPhotoUrl(identityPhoto: IdentityPhoto) {
  //   return identityPhoto?.cover?.thumbnailUrl || USER_DEFAULT_COVER_URL;
  // }

  static checkOwnerShip(user1: User, user2: User) {
    console.log(user1)
    console.log(user2)
    if (!user1?.id || !user2?.id || (user1?.id !== user2?.id)) {
      console.log('not owner');
      return false;
    } else {
      console.log('is owner');
      return true;
    }
  }

  signUp(user: Credentials) {
    return this.http.post<User>(environment.identity_api_root_url + '/users/signup', user).pipe(
      map(res => {
        // console.log(res);
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }

  login(data: Credential) {
    console.log(environment.identity_api_root_url)
    return this.http.post<{ token: string, user: User }>(environment.identity_api_root_url + '/users/login', data).pipe(
      map((res) => {
        this.token = { token: res.token } as any;
        if (this.token?.token) {
          this.saveToken(this.token);
          this.userService.getUserDeliveryAddress(res?.user?.id)?.subscribe(addresses => {
            res.user.otherDeliveryAddresses = addresses;
            this.userService.setLoggedUserLocalSync(res.user);
          })
          this.userService.setLoggedUserLocal(res.user);
        }
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }

  logout() {
    this.deleteToken(); // delete jwt auth token
    this.userService.deleteLoggedUserLocal(); // clear user details
    window.location.href = window.location.protocol + '//' + window.location.host + Urls.home;

  }

  getToken(): Token {
    return this.store.getObjectSync('token');
  }

  saveToken(token: Token) {
    /** Save the authentication token **/
    this.store.setObject('token', token);
    this.token = token;
  }

  deleteToken() {
    this.store.remove('token');
  }

  isAuthenticated() {
    if (this.token) {
      return true;
    }
    return false;
  }

  requestPasswordResetLink(email: string) {
    const data = {
      email,
      app: {
        name: APP_NAME,
        logoUrl: LOGO_URL,
        appSMTPEmail: CONTACT_EMAIL,
        contactPageUrl: CONTACT_PAGE
      }
    }
    console.log(data);
    return this.http.post<User>(environment.identity_api_root_url + '/users/reset-password', data).pipe(
      map(res => {
        console.log(res);
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }

  changePassword(cred: Credentials) {
    return this.http.post<User>(environment.identity_api_root_url + '/users/change-password', cred).pipe(
      map(res => {
        console.log(res);
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }


  requestEmailVerificationLink(email: string) {
    const data = {
      email,
      app: {
        name: APP_NAME,
        logoUrl: LOGO_URL,
        appSMTPEmail: CONTACT_EMAIL,
        contactPageUrl: CONTACT_PAGE
      }
    }
    console.log(data);
    return this.http.post<User>(environment.identity_api_root_url + '/users/email-verification-request', data).pipe(
      map(res => {
        console.log(res);
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }

  verifyEmail(token: string) {
    const url=`${environment.identity_api_root_url}/users/verifyEmail/${token}`;
    return this.http.get(url).pipe(
      map(res => {
        console.log(res);
        return res as any;
      }),
      catchError(e => this.handleError(e))
    );
  }


  /**************************************/
  /************Lock screen***************/
  /**************************************/
  lockScreen() {
    // generate the number
    const max = 1000, min = 100;
    const code = Math.floor(Math.random() * (max - min) + min);
    this.store.set('lock_code', code);
    return code;
  }

  async unlockScreen(code: number): Promise<boolean> {
    const stored_code: number = await this.store.get('lock_code');
    if (stored_code === code) {
      await this.store.remove('lock_code');
      return true;
    } else {
      return false;
    }
  }

  async isScreenLocked() {
    const stored_code: number = await this.store.get('lock_code');
    if (stored_code) {
      return true;
    }
    return false;
  }



  private handleError(e: any): any {
    // console.log(e);
    return throwError(UtilityService.myHttpErrorFormat(e, 'user'));
  }
}
