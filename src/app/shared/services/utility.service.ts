import { Router } from '@angular/router';
import { MY_ACTION, SignalService } from 'src/app/shared/services/signal.service';
import { MyFile as File } from './../../models/file';
import { LatLng } from './../../models/LatLng';
import { Injectable } from '@angular/core';
import { MyLocalStorageService } from './local-storage.service';
import { Country } from 'src/app/models';
import { Location } from '@angular/common'
import { Urls } from 'src/app/config';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(
    private localStore: MyLocalStorageService,
    private signal: SignalService,
    private http: HttpClient,
    private location: Location,
    private router: Router
  ) { }

  getRecatchaKey(){
    return '6LdqzcglAAAAAHtt26F2BlHWM3exGscEGp2Uw-1t'
  }

  setSearchTermLocal(term: string) {
    this.localStore.setSync('searchKey', term);
    this.signal.announceSearchKey(term);
  }
  getSearchTermLocal() {
    return this.localStore.getSync('searchKey');
  }

  static arrayRemove(arr, value) {
    return arr?.filter(function (ele) {
      return ele != value;
    });
  }

  static ObjInArray(arr: any[], obj, prop = '') {
    let found = false;
    arr?.forEach(e => {
      if (prop) {
        if (e[prop] == obj[prop]) {
          found = true;
          return;
        }
      }
    })
    return found;
  }

  static shuffle(a: any[]) {
    if (!Array.isArray(a)) {
      return [];
    }
    for (let i = a?.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // Calculate and return difference between two date objects in days
  static calcDatesDiffInDays(startDate: Date, endDate: Date = new Date(Date.now())) {
    endDate = new Date(endDate);
    startDate = new Date(startDate);
    const diff = Math.abs(startDate.getTime() - endDate.getTime());
    return (diff / (1000 * 3600 * 24));
  }

  static generateAccountNumber() {
    return Math.random().toString().slice(2, 11);
  }

  static generateRandomNumber() {
    return Math.random().toString().slice(2, 6);

  }


  static destroySubscription(subscription$: any) {

    if (Array.isArray(subscription$)) {
      subscription$.forEach(sub => {
        try {
          sub.unsubscribe();
        } catch (error) {
        }
      });
    } else {
      try {
        subscription$.unsubscribe();
      } catch (error) {
      }
    }
  }


  // String 1 constains string2 return true else false
  // last argument (i) is case sensitivity
  static stringContains(str1: string, str2: string, sensitivity: boolean = true) {
    if (sensitivity) {
      return (str1.indexOf(str2) >= 0); // boy != Boy
    } else {
      return str1.toLowerCase().indexOf(str2.toLowerCase()) >= 0; // boy == Boy
    }
  }

  static supportedImageFiles() {
    return 'image/png,image/gif,image/jpeg,image/bmp,image/x-icon,image/vnd.dwg, image/tiff, 	image/webp, image/x-tiff, 	image/vnd.microsoft.icon';
  }
  static supportedAudioFiles() {
    return 'audio/mp3,audio/mp2,audio/aac,audio/mpeg,audio/ogg,audio/3gpp,audio/mpeg3,audio/wav,audio/x-wav, audio/x-aiff, audio/aiff, audio/xm,audio/x-voc,audio/voxware,audio/midi,audio/basic,audio/x-mod,audio/mod,audio/x-gsm,audio/x-au';
  }
  static supportedVideoFiles() {
    return 'video/x-matroska,video/webm,video/flv,video/mkv,video/mp4,video/avi,video/3gpp,video/ogg,video/3gpp2,audio/3gpp2,video/msvideo,video/x-mpeq2a, video/mpeg,video/quicktime,video/vosaic,video/x-msvideo';
  }
  static supportedDocumentFiles() {
    return 'text/plain,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation, text/x-c,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/epub+zip, text/css,application/xml, text/xml, text/html,application/pdf,application/x-rtf,application/rtf, text/x-script.phyton, text/richtext, text/vnd.rn-realtext,application/msword,application/wordperfect,application/x-lotus,application/excel,application/x-excel,application/x-msexcel,application/vnd.ms-excel';
  }
  static supportedOtherFiles() {
    return 'multipart/x-gzip,application/x-compressed,application/zip,application/vnd.rar, application/x-7z-compressed, application/octet-stream';
  }

  static isImage(file: File) {
    return UtilityService.stringContains(UtilityService.supportedImageFiles(), file?.mimeType ?? '');
  }
  static isAudio(file: File) {
    return UtilityService.stringContains(UtilityService.supportedAudioFiles(), file?.mimeType ?? '');
  }
  static isVideo(file: File) {
    return UtilityService.stringContains(UtilityService.supportedVideoFiles(), file?.mimeType ?? '');
  }
  static isDocument(file: File) {
    return UtilityService.stringContains(UtilityService.supportedDocumentFiles(), file?.mimeType ?? '');
  }



  static generateUniqueFileName(fileName: string): string {
    const tem = fileName.split('.');
    const ext = tem[tem.length - 1]
    return Math.random().toString(16).substr(2, 8) + new Date().getMilliseconds() + '_' + new Date().getSeconds() + '_'
      + new Date().getMinutes() + '_' + new Date().getHours() + '_' +
      new Date().getDay() + '_' + new Date().getMonth() + '_' +
      new Date().getFullYear() + '.' + ext;
  }

  /************Format date for form rebind**********/
  formatDateFormRebind(date: Date) {
    date = new Date(date);
    if (date) {
      const month = ('' + date.getMonth()).length == 1 ? '0' + date.getMonth() : date.getMonth()
      const day = ('' + date.getDay()).length == 1 ? '0' + date.getDay() : date.getDay()
      return '' + date.getFullYear() + '-' + month + '-' + day;
    }
    return undefined;
  }


  /************Lock screen******* */
  lockScreen() {
    // generate the number
    const max = 1000, min = 100;
    const code = Math.floor(Math.random() * (max - min) + min);
    this.localStore.set('lock_code', code);
    return code;
  }

  async unlockScreen(code: number): Promise<boolean> {
    const stored_code: number = await this.localStore.get('lock_code')
    if (stored_code === code) {
      await this.localStore.remove('lock_code');
      return true;
    } else {
      return false;
    }
  }

  async isScreenLocked() {
    const stored_code: number = await this.localStore.get('lock_code');
    if (stored_code) {
      return true;
    }
    return false;
  }

  /****** Search for object from and array and geit its index****/
  static searchObjFromArrray(id: any, objs: any[]) {
    if (!id || (objs?.length < 1)) {
      // console.log(id);
      // console.log(objs);
      // console.log('invalid args');
      return undefined;
    }


    let found;
    objs?.forEach((obj, index) => {
      if (obj?.id == id) {
        found = [obj, index];
      }
    })
    return found;
  }



  // getCountriesWithCode() {
  //   return [{ "Code": "AF", "Name": "Afghanistan" }, { "Code": "AX", "Name": "\u00c5land Islands" }, { "Code": "AL", "Name": "Albania" }, { "Code": "DZ", "Name": "Algeria" }, { "Code": "AS", "Name": "American Samoa" }, { "Code": "AD", "Name": "Andorra" }, { "Code": "AO", "Name": "Angola" }, { "Code": "AI", "Name": "Anguilla" }, { "Code": "AQ", "Name": "Antarctica" }, { "Code": "AG", "Name": "Antigua and Barbuda" }, { "Code": "AR", "Name": "Argentina" }, { "Code": "AM", "Name": "Armenia" }, { "Code": "AW", "Name": "Aruba" }, { "Code": "AU", "Name": "Australia" }, { "Code": "AT", "Name": "Austria" }, { "Code": "AZ", "Name": "Azerbaijan" }, { "Code": "BS", "Name": "Bahamas" }, { "Code": "BH", "Name": "Bahrain" }, { "Code": "BD", "Name": "Bangladesh" }, { "Code": "BB", "Name": "Barbados" }, { "Code": "BY", "Name": "Belarus" }, { "Code": "BE", "Name": "Belgium" }, { "Code": "BZ", "Name": "Belize" }, { "Code": "BJ", "Name": "Benin" }, { "Code": "BM", "Name": "Bermuda" }, { "Code": "BT", "Name": "Bhutan" }, { "Code": "BO", "Name": "Bolivia, Plurinational State of" }, { "Code": "BQ", "Name": "Bonaire, Sint Eustatius and Saba" }, { "Code": "BA", "Name": "Bosnia and Herzegovina" }, { "Code": "BW", "Name": "Botswana" }, { "Code": "BV", "Name": "Bouvet Island" }, { "Code": "BR", "Name": "Brazil" }, { "Code": "IO", "Name": "British Indian Ocean Territory" }, { "Code": "BN", "Name": "Brunei Darussalam" }, { "Code": "BG", "Name": "Bulgaria" }, { "Code": "BF", "Name": "Burkina Faso" }, { "Code": "BI", "Name": "Burundi" }, { "Code": "KH", "Name": "Cambodia" }, { "Code": "CM", "Name": "Cameroon" }, { "Code": "CA", "Name": "Canada" }, { "Code": "CV", "Name": "Cape Verde" }, { "Code": "KY", "Name": "Cayman Islands" }, { "Code": "CF", "Name": "Central African Republic" }, { "Code": "TD", "Name": "Chad" }, { "Code": "CL", "Name": "Chile" }, { "Code": "CN", "Name": "China" }, { "Code": "CX", "Name": "Christmas Island" }, { "Code": "CC", "Name": "Cocos (Keeling) Islands" }, { "Code": "CO", "Name": "Colombia" }, { "Code": "KM", "Name": "Comoros" }, { "Code": "CG", "Name": "Congo" }, { "Code": "CD", "Name": "Congo, the Democratic Republic of the" }, { "Code": "CK", "Name": "Cook Islands" }, { "Code": "CR", "Name": "Costa Rica" }, { "Code": "CI", "Name": "C\u00f4te d'Ivoire" }, { "Code": "HR", "Name": "Croatia" }, { "Code": "CU", "Name": "Cuba" }, { "Code": "CW", "Name": "Cura\u00e7ao" }, { "Code": "CY", "Name": "Cyprus" }, { "Code": "CZ", "Name": "Czech Republic" }, { "Code": "DK", "Name": "Denmark" }, { "Code": "DJ", "Name": "Djibouti" }, { "Code": "DM", "Name": "Dominica" }, { "Code": "DO", "Name": "Dominican Republic" }, { "Code": "EC", "Name": "Ecuador" }, { "Code": "EG", "Name": "Egypt" }, { "Code": "SV", "Name": "El Salvador" }, { "Code": "GQ", "Name": "Equatorial Guinea" }, { "Code": "ER", "Name": "Eritrea" }, { "Code": "EE", "Name": "Estonia" }, { "Code": "ET", "Name": "Ethiopia" }, { "Code": "FK", "Name": "Falkland Islands (Malvinas)" }, { "Code": "FO", "Name": "Faroe Islands" }, { "Code": "FJ", "Name": "Fiji" }, { "Code": "FI", "Name": "Finland" }, { "Code": "FR", "Name": "France" }, { "Code": "GF", "Name": "French Guiana" }, { "Code": "PF", "Name": "French Polynesia" }, { "Code": "TF", "Name": "French Southern Territories" }, { "Code": "GA", "Name": "Gabon" }, { "Code": "GM", "Name": "Gambia" }, { "Code": "GE", "Name": "Georgia" }, { "Code": "DE", "Name": "Germany" }, { "Code": "GH", "Name": "Ghana" }, { "Code": "GI", "Name": "Gibraltar" }, { "Code": "GR", "Name": "Greece" }, { "Code": "GL", "Name": "Greenland" }, { "Code": "GD", "Name": "Grenada" }, { "Code": "GP", "Name": "Guadeloupe" }, { "Code": "GU", "Name": "Guam" }, { "Code": "GT", "Name": "Guatemala" }, { "Code": "GG", "Name": "Guernsey" }, { "Code": "GN", "Name": "Guinea" }, { "Code": "GW", "Name": "Guinea-Bissau" }, { "Code": "GY", "Name": "Guyana" }, { "Code": "HT", "Name": "Haiti" }, { "Code": "HM", "Name": "Heard Island and McDonald Islands" }, { "Code": "VA", "Name": "Holy See (Vatican City State)" }, { "Code": "HN", "Name": "Honduras" }, { "Code": "HK", "Name": "Hong Kong" }, { "Code": "HU", "Name": "Hungary" }, { "Code": "IS", "Name": "Iceland" }, { "Code": "IN", "Name": "India" }, { "Code": "ID", "Name": "Indonesia" }, { "Code": "IR", "Name": "Iran, Islamic Republic of" }, { "Code": "IQ", "Name": "Iraq" }, { "Code": "IE", "Name": "Ireland" }, { "Code": "IM", "Name": "Isle of Man" }, { "Code": "IL", "Name": "Israel" }, { "Code": "IT", "Name": "Italy" }, { "Code": "JM", "Name": "Jamaica" }, { "Code": "JP", "Name": "Japan" }, { "Code": "JE", "Name": "Jersey" }, { "Code": "JO", "Name": "Jordan" }, { "Code": "KZ", "Name": "Kazakhstan" }, { "Code": "KE", "Name": "Kenya" }, { "Code": "KI", "Name": "Kiribati" }, { "Code": "KP", "Name": "Korea, Democratic People's Republic of" }, { "Code": "KR", "Name": "Korea, Republic of" }, { "Code": "KW", "Name": "Kuwait" }, { "Code": "KG", "Name": "Kyrgyzstan" }, { "Code": "LA", "Name": "Lao People's Democratic Republic" }, { "Code": "LV", "Name": "Latvia" }, { "Code": "LB", "Name": "Lebanon" }, { "Code": "LS", "Name": "Lesotho" }, { "Code": "LR", "Name": "Liberia" }, { "Code": "LY", "Name": "Libya" }, { "Code": "LI", "Name": "Liechtenstein" }, { "Code": "LT", "Name": "Lithuania" }, { "Code": "LU", "Name": "Luxembourg" }, { "Code": "MO", "Name": "Macao" }, { "Code": "MK", "Name": "Macedonia, the Former Yugoslav Republic of" }, { "Code": "MG", "Name": "Madagascar" }, { "Code": "MW", "Name": "Malawi" }, { "Code": "MY", "Name": "Malaysia" }, { "Code": "MV", "Name": "Maldives" }, { "Code": "ML", "Name": "Mali" }, { "Code": "MT", "Name": "Malta" }, { "Code": "MH", "Name": "Marshall Islands" }, { "Code": "MQ", "Name": "Martinique" }, { "Code": "MR", "Name": "Mauritania" }, { "Code": "MU", "Name": "Mauritius" }, { "Code": "YT", "Name": "Mayotte" }, { "Code": "MX", "Name": "Mexico" }, { "Code": "FM", "Name": "Micronesia, Federated States of" }, { "Code": "MD", "Name": "Moldova, Republic of" }, { "Code": "MC", "Name": "Monaco" }, { "Code": "MN", "Name": "Mongolia" }, { "Code": "ME", "Name": "Montenegro" }, { "Code": "MS", "Name": "Montserrat" }, { "Code": "MA", "Name": "Morocco" }, { "Code": "MZ", "Name": "Mozambique" }, { "Code": "MM", "Name": "Myanmar" }, { "Code": "NA", "Name": "Namibia" }, { "Code": "NR", "Name": "Nauru" }, { "Code": "NP", "Name": "Nepal" }, { "Code": "NL", "Name": "Netherlands" }, { "Code": "NC", "Name": "New Caledonia" }, { "Code": "NZ", "Name": "New Zealand" }, { "Code": "NI", "Name": "Nicaragua" }, { "Code": "NE", "Name": "Niger" }, { "Code": "NG", "Name": "Nigeria" }, { "Code": "NU", "Name": "Niue" }, { "Code": "NF", "Name": "Norfolk Island" }, { "Code": "MP", "Name": "Northern Mariana Islands" }, { "Code": "NO", "Name": "Norway" }, { "Code": "OM", "Name": "Oman" }, { "Code": "PK", "Name": "Pakistan" }, { "Code": "PW", "Name": "Palau" }, { "Code": "PS", "Name": "Palestine, State of" }, { "Code": "PA", "Name": "Panama" }, { "Code": "PG", "Name": "Papua New Guinea" }, { "Code": "PY", "Name": "Paraguay" }, { "Code": "PE", "Name": "Peru" }, { "Code": "PH", "Name": "Philippines" }, { "Code": "PN", "Name": "Pitcairn" }, { "Code": "PL", "Name": "Poland" }, { "Code": "PT", "Name": "Portugal" }, { "Code": "PR", "Name": "Puerto Rico" }, { "Code": "QA", "Name": "Qatar" }, { "Code": "RE", "Name": "R\u00e9union" }, { "Code": "RO", "Name": "Romania" }, { "Code": "RU", "Name": "Russian Federation" }, { "Code": "RW", "Name": "Rwanda" }, { "Code": "BL", "Name": "Saint Barth\u00e9lemy" }, { "Code": "SH", "Name": "Saint Helena, Ascension and Tristan da Cunha" }, { "Code": "KN", "Name": "Saint Kitts and Nevis" }, { "Code": "LC", "Name": "Saint Lucia" }, { "Code": "MF", "Name": "Saint Martin (French part)" }, { "Code": "PM", "Name": "Saint Pierre and Miquelon" }, { "Code": "VC", "Name": "Saint Vincent and the Grenadines" }, { "Code": "WS", "Name": "Samoa" }, { "Code": "SM", "Name": "San Marino" }, { "Code": "ST", "Name": "Sao Tome and Principe" }, { "Code": "SA", "Name": "Saudi Arabia" }, { "Code": "SN", "Name": "Senegal" }, { "Code": "RS", "Name": "Serbia" }, { "Code": "SC", "Name": "Seychelles" }, { "Code": "SL", "Name": "Sierra Leone" }, { "Code": "SG", "Name": "Singapore" }, { "Code": "SX", "Name": "Sint Maarten (Dutch part)" }, { "Code": "SK", "Name": "Slovakia" }, { "Code": "SI", "Name": "Slovenia" }, { "Code": "SB", "Name": "Solomon Islands" }, { "Code": "SO", "Name": "Somalia" }, { "Code": "ZA", "Name": "South Africa" }, { "Code": "GS", "Name": "South Georgia and the South Sandwich Islands" }, { "Code": "SS", "Name": "South Sudan" }, { "Code": "ES", "Name": "Spain" }, { "Code": "LK", "Name": "Sri Lanka" }, { "Code": "SD", "Name": "Sudan" }, { "Code": "SR", "Name": "Suriname" }, { "Code": "SJ", "Name": "Svalbard and Jan Mayen" }, { "Code": "SZ", "Name": "Swaziland" }, { "Code": "SE", "Name": "Sweden" }, { "Code": "CH", "Name": "Switzerland" }, { "Code": "SY", "Name": "Syrian Arab Republic" }, { "Code": "TW", "Name": "Taiwan, Province of China" }, { "Code": "TJ", "Name": "Tajikistan" }, { "Code": "TZ", "Name": "Tanzania, United Republic of" }, { "Code": "TH", "Name": "Thailand" }, { "Code": "TL", "Name": "Timor-Leste" }, { "Code": "TG", "Name": "Togo" }, { "Code": "TK", "Name": "Tokelau" }, { "Code": "TO", "Name": "Tonga" }, { "Code": "TT", "Name": "Trinidad and Tobago" }, { "Code": "TN", "Name": "Tunisia" }, { "Code": "TR", "Name": "Turkey" }, { "Code": "TM", "Name": "Turkmenistan" }, { "Code": "TC", "Name": "Turks and Caicos Islands" }, { "Code": "TV", "Name": "Tuvalu" }, { "Code": "UG", "Name": "Uganda" }, { "Code": "UA", "Name": "Ukraine" }, { "Code": "AE", "Name": "United Arab Emirates" }, { "Code": "GB", "Name": "United Kingdom" }, { "Code": "US", "Name": "United States" }, { "Code": "UM", "Name": "United States Minor Outlying Islands" }, { "Code": "UY", "Name": "Uruguay" }, { "Code": "UZ", "Name": "Uzbekistan" }, { "Code": "VU", "Name": "Vanuatu" }, { "Code": "VE", "Name": "Venezuela, Bolivarian Republic of" }, { "Code": "VN", "Name": "Viet Nam" }, { "Code": "VG", "Name": "Virgin Islands, British" }, { "Code": "VI", "Name": "Virgin Islands, U.S." }, { "Code": "WF", "Name": "Wallis and Futuna" }, { "Code": "EH", "Name": "Western Sahara" }, { "Code": "YE", "Name": "Yemen" }, { "Code": "ZM", "Name": "Zambia" }, { "Code": "ZW", "Name": "Zimbabwe" }]
  // }

  getAllCountryNames(): Observable<string[]> {
    const url = `${environment.store_api_root_url}/countries/names`
    return this.http.get<string[]>(url).pipe(
      map((res: string[]) => {
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }

  // getCodeByCountryName(country: string) {
  //   for (let i = 0; i < this.getCountriesWithCode().length; i++) {
  //     const data = this.getCountriesWithCode()[i];
  //     if (data.Name.toString().toLowerCase().search(country.toLowerCase()) > -1) {
  //       return data.Code;
  //     }
  //   }
  //   return '';
  // }


  getStatesByCountry(country: string): Observable<string[]>{
    // 
    if (!country) {
      console.log('Invalid country name')
      return undefined;
    }
    const url = `${environment.store_api_root_url}/countries/${country}/states/name`
    return this.http.get<string[]>(url).pipe(
      map((res: string[]) => {
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }



  getLatLngArray(latLngString: string = ''): LatLng {
    const temp = latLngString.split(',');
    const latLng = <LatLng>{};
    latLng.lat = parseFloat(temp.length > 0 ? temp[0] : '');
    latLng.lng = parseFloat(temp.length > 1 ? temp[1] : '');

    return latLng;
  }

  static myHttpErrorFormat(e: { error: any; status: number; }, entityName = ''): { title: string, message: string } {
    console.log(e);
    let msg = {} as { title: string, message: string };
    let statusCode = 0;
    console.log(e.error);
    if (e && e.error) {
      statusCode = e.status;
    }
    switch (statusCode) {
      case 0:
        msg.title = 'No connection';
        msg.message = 'Check your internet connection and try again';
        break;
      case 422:
        msg.title = `Invalid ${entityName} data`;
        msg.message = 'Check all required fields';
        break;
      case 400 || 401:
        msg.title = `Authentication error`;
        msg.message = 'Please login gain';
        break;
      case 409:
        msg.title = `Authentication error`;
        msg.message = 'Email is alredy taken';
        break;
    }
    return msg;
  }


  getSearchKey(): string {
    return this.localStore.getSync('searchKey');
  }

  setSearchKey(key: string) {
    this.localStore.setSync('searchKey', key);
  }

  reload() {
    if (!this.isMobile()) {
      window.location.reload()
    } else {
      this.router.navigate([Urls.home]);
      setTimeout(() => {
        this.location.back();
      }, 100);
    }
  }

  isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }


  handleError(e: any) {
    console.log(e);
    const message = '';
    if (e.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', e.error.message);
      console.log('No connection');
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${e.status}, ` + `body was: ${e.code}`
      );
    }
    // return an observable with a user-facing error message
    return throwError('System error, please report to: admin@kejettia.com');
  }

}
