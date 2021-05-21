import { Injectable } from '@angular/core';

import { Subject, Observable, of } from 'rxjs';
import { MapsAPILoader } from '@agm/core';
import { tap, map, switchMap } from 'rxjs/operators';
import { from as fromPromise } from 'rxjs';
import { SignalService, MY_ACTION } from './signal.service';
import { MyLocalStorageService } from './local-storage.service';

export const DEFAULT_LOCATION_LAT = 11.1978503;
export const DEFAULT_LOCATION_LNG = 13.83478;

declare var google: any;

export interface Location {
  lat: number;
  lng: number;
}

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  private geocoder: any;
  private _location = {} as Location;

  constructor(
    private mapLoader: MapsAPILoader,
    private _signalService: SignalService,
    private _localStorage: MyLocalStorageService
  ) {

  }

  set location(loc: Location) {
    this._location = loc;
    this.setLocationLocal();
  }
  get location() {
    return this._location;
  }


  private initGeocoder() {
    console.log('Init geocoder!');
    this.geocoder = new google.maps.Geocoder();
  }

  private waitForMapsToLoad(): Observable<boolean> {
    if (!this.geocoder) {
      return fromPromise(this.mapLoader.load())
        .pipe(
          tap(() => this.initGeocoder()),
          map(() => true)
        );
    }
    return of(true);
  }

  geocodeAddress(location: string): Observable<any> {
    console.log('Start geocoding!');
    return this.waitForMapsToLoad().pipe(
      // filter(loaded => loaded),
      switchMap(() => {
        return new Observable(observer => {
          this.geocoder.geocode({ 'address': location }, (results, status) => {
            if (status == google.maps.GeocoderStatus.OK) {
              console.log('Geocoding complete!');
              observer.next({
                lat: results[0].geometry.location.lat(),
                lng: results[0].geometry.location.lng()
              });
            } else {
              console.log('Error - ', results, ' & Status - ', status);
              observer.next({ lat: 0, lng: 0 });
            }
            observer.complete();
          });
        });
      })
    );
  }

  getLocation(opts = { enableHighAccuracy: true, timeout: 5000, maximumAge: 10 * 60 * 1000 }): Observable<Location> {
    return new Observable(observer => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position: any) => {
          if (position) {
            // console.log('Latitude: ' + position.coords.latitude +
            //   'Longitude: ' + position.coords.longitude);
            const location = {} as Location;
            location.lat = position.coords.latitude;
            location.lng = position.coords.longitude;
            observer.next(location);
          }
        },
          (error: any) => {
            console.log(error);
            observer.next({ lat: 0, lng: 0 });
          }, opts);
      } else {
        alert('Geolocation is not supported by this browser.');
        observer.next({ lat: 0, lng: 0 });
      }
    });
  }





  getAddressFromLatLng(location: Location): Observable<any> {
    console.log('Start geocoding!');
    const latLng = new google.maps.LatLng(location.lat, location.lng);
    return this.waitForMapsToLoad().pipe(
      // filter(loaded => loaded),
      switchMap(() => {
        return new Observable(observer => {
          this.geocoder.geocode({ latLng }, (results, status) => {
            if (status == google.maps.GeocoderStatus.OK) {
              console.log('Geocoding complete!');
              observer.next(results[0]);
            } else {
              console.log('Error - ', results, ' & Status - ', status);
              observer.next({});
            }
            observer.complete();
          });
        });
      })
    );
  }



  setLocationLocal() {
    this._localStorage.setObject('currentLocation', this._location).then(_ => {
      this._signalService.sendAction(MY_ACTION.locationChanged);
    });
  }
  async getLocationLocal() {
    return await this._localStorage.getObject('currentLocation');
  }
  setUserCountryLocal(country: string) {
    this._localStorage.set('user_country', country).then(_ => {
      // this._signalService.sendAction(MY_ACTION.userCountryChange);
    });
  }

  async getUserCountryLocal(): Promise<string> {
    return await this._localStorage.get('user_country');

  }



}
