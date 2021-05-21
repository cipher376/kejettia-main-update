
import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { MyAuthService } from './my-auth.service';
import { UtilityService } from './utility.service';

@Injectable({
    providedIn: 'root'
})
export class ScreenLockGuardService implements CanActivate {

    constructor(public _auth: MyAuthService,
        private _router: Router,
        private _util: UtilityService) { }

    async canActivate(): Promise<boolean> {
        if (!await this._util.isScreenLocked()) {
            console.log('Authenticated user');
            return true;
        } else {
            // if its login dont reload
            // alert("hello");
            if (this._router.url.indexOf('login') < 0) {
                this._router.navigate([
                    'lock'
                ]);
            }
            return false;
        }
    }
}
