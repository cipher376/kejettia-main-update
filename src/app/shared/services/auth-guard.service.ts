
import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { MyAuthService } from './my-auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild {

    constructor(public _auth: MyAuthService, private _router: Router) { }

    canActivate(): boolean {
        if (this._auth.isAuthenticated()) {
            console.log('Authenticated user');
            return true;
        } else {
            // if its login dont reload
            // alert("hello");
            if (this._router.url.indexOf('login') < 0) {
                this._router.navigate([
                    'login'
                ]);
            }
            return false;
        }
    }


    canActivateChild(): boolean {
        if (this._auth.isAuthenticated()) {
            console.log('Allowing child navigation');
            return true;
        } else {
            // alert("hello1");
            // if its login dont reload
            if (this._router.url.indexOf('login') < 0) {
                this._router.navigate([
                    'login'
                ]);
            }
            return false;
        }
    }
}
