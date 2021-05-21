import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

export interface FastRoute {
  url: string[];
  params: string[];
  filters: string[];
}

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router: Router) {
    // console.log(router.url);
  }

  private _fastRouteSource = new Subject<FastRoute>();
  fastRouteSource$ = this._fastRouteSource.asObservable();

  fastRouteChange(route: FastRoute) {
    this._fastRouteSource.next(route);
  }


}
