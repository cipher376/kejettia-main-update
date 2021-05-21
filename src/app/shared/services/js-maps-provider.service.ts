import { Injectable } from '@angular/core';

declare var google;

@Injectable({
  providedIn: 'root'
})
export class JsMapsProviderService {

  map: any;
  apiKey: any = 'AIzaSyDZCBkWk9jcljmo7k1FL3UR2fR91F2cirY'; /*Your API Key*/
  constructor() {
     /*load google map script dynamically */
     const script = document.createElement('script');
     script.id = 'googleMap';
     if (this.apiKey) {
         script.src = 'https://maps.googleapis.com/maps/api/js?key=' + this.apiKey;
     } else {
         script.src = 'https://maps.googleapis.com/maps/api/js?key=';
     }
     document.head.appendChild(script);
  }

  init(location, element) {
    console.log('Creating map');
    const latLng = new google.maps.LatLng(location.latitude, location.longitude);

    const opts = {
      center: latLng,
      zoom: 11,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(element.nativeElement, opts);
  }

}
