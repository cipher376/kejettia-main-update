
import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { MyAuthService } from './my-auth.service';

@Injectable({
    providedIn: 'root'
})
export class RouteGuardService implements CanActivate, CanActivateChild {

    constructor( private _router: Router) {

    }

    canActivate() {
      console.log(this._router.url);
        return true;
    }


    canActivateChild(): boolean {
        return true;
    }
}
