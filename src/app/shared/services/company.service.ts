import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { CompanyApi, MessageApi, CompanyAddressApi, BookingApi, ProjectApi, Company, Message} from "../company-sdk";
import { PhotoApi, MyUserApi, GeoPoint } from "../identity-sdk";
import { MyLocalStorageService } from "./local-storage.service";
import { Photo } from "../store-sdk";
import { MY_ACTION, SignalService } from "./signal.service";
import { UtilityService } from "./utility.service";

export interface CompanyView {
  id: string;
  addressId: string;
  name: string;
  email: string;
  phone1: string;
  phone2: string;
  isRegistered: boolean;
  longDesc: string;
  shortDesc: string;
  url: string;
  country: string;
  state: string;
  city: string;
  suburb: string;
  street: string;
  createdOn: Date;
  modifiedOn: Date;
  coverImage: string;
  smallImage: string;
  frontImage: string;
  backImage: string;
  lat?: number;
  lng?: number;
  rate: number;
  photos: Photo[];
}

@Injectable({
  providedIn: 'root'
})
export class MyCompanyService {

  // ONE_MONTH = 30 * 24 * 60 * 60 * 1000; // 1 month in millisecons

  constructor(
    private companyApi: CompanyApi,
    private messageApi: MessageApi,
    private localStorage: MyLocalStorageService,
    private util: UtilityService,
    private signalService: SignalService

  ) {

  }


  public getCompanyById(conpanyId: any) {
    if (!conpanyId) {
      console.error('No Company id specified');
      return undefined;
    }
    const filter = {
      where: {
        id: conpanyId
      },
      include: [
        {
          relation: 'address',
        },
        {
          relation: 'owners'
        },
        {
          relation: 'certificates'
        }, {
          relation: 'workers'
        }, {
          relation: 'services'
        },
        {
          relation: 'awards'
        },
        {
          relation: 'bookings'
        },
        {
          relation: 'messages'
        },
        {
          relation: 'photos',
        },
        {
          relation: 'projects',
        }
      ]
    } as any;
    return this.companyApi.findById<Company>(conpanyId, filter).pipe(
      map((res) => {
        // save company to disk
        return (res as Company);
      }), catchError((e) => this.handleError(e))
    );
  }

  public getCompanyByGeopoint(point: GeoPoint, skip = 0, limit = 1000, maxDistanceFromPoint = 4000,
    unit = 'kilometers') {
    const where = {
      gmap: {
        near: point,
        maxDistance: maxDistanceFromPoint,
        unit
      }
    };

    const filter = {
      include: [
        {
          relation: 'address',
          scope: {
            where
          }
        },
        {
          relation: 'owners'
        },
        {
          relation: 'certificates'
        }, {
          relation: 'workers'
        }, {
          relation: 'services'
        },
        {
          relation: 'awards'
        },
        {
          relation: 'bookings'
        },
        {
          relation: 'messages'
        },
        {
          relation: 'photos',
        },
        {
          relation: 'projects',
        }
      ]
    } as any;

    return this.companyApi.find<Company>(filter).pipe(
      map((res) => {
        // save company to disk
        if (res && res.length > 0) {
          console.log(res);
          this.saveCompaniesLocal(res);
        }
        return (res as Company[]);
      }), catchError((e) => this.handleError(e))
    );
  }



  public getCompanies(skip = 0, limit = 1000, country: string = null, state: string = null, city: string = null, suburb: string = null) {
    const where = {} as any;
    if (country) {
      where.country = country;
    }
    if (state) {
      where.state = state;
    }
    if (city) {
      where.city = city;
    }
    if (suburb) {
      where.suburb = suburb;
    }

    const filter = {
      order: 'id DESC',
      limit,
      skip,
      include: [
        {
          relation: 'address',
          scope: {
            where
          }
        },
        {
          relation: 'owners'
        },
        {
          relation: 'certificates'
        }, {
          relation: 'workers'
        }, {
          relation: 'services'
        },
        {
          relation: 'awards'
        },
        {
          relation: 'bookings'
        },
        {
          relation: 'messages'
        },
        {
          relation: 'photos',
        },
        {
          relation: 'projects',
        }
      ]
    } as any;


    return this.companyApi.find(filter).pipe(
      map((res: Company[]) => {
        this.saveCompaniesLocal(res);
        return res;
      }), catchError((e) => this.handleError(e))
    );
  }

  async setCompanyLocal(company: Company) {
    return new Promise(resolve => {
      this.localStorage.setObject('company', company).then(_ => {
        // console.log('selected Company update on disk');
        resolve(true);
      });
    });
  }
  async saveCompaniesLocal(companies: Company[]) {
    return new Promise(resolve => {
      this.companyToCompanyView(companies).then(companys => {
        this.localStorage.setObject('companies', companys).then(_ => {
          console.log('companies update on disk');
          this.signalService.sendAction(MY_ACTION.companiesLoaded);
          resolve(true);
        });
      })

    });
  }

  rateCompany(value: number) {
    return this.util.rate(value, 1, 5);
  }
  async companyToCompanyView(companies: Company[]) {
    const companyViews: CompanyView[] = [];
    for (const company of companies) {
      const view: any = {
        id: company.id,
        name: company.name,
        email: company.email,
        url: company.websiteUrl,
        phone1: company.phone1,
        phone2: company.phone2,
        isRegistered: company.isRegistered,
        longDesc: company.longDescription,
        shortDesc: company.shortDescription,
        createdOn: company.dateCreated,
        modifiedOn: company.dateModified,
        rate: await this.rateCompany(2)
      };
      if (company.address) {
        view.country = company.address.country;
        view.state = company.address.state;
        view.city = company.address.city;
        view.suburb = company.address.suburb;
        view.street = company.address.street;
        view.addressId = company.address.id;
      }

      // get images
      view.coverImage = this.util.getCoverPhoto(company.photos as any);
      view.smallImage = this.util.getThumbnailPhoto(company.photos as any);
      view.frontImage = this.util.getFrontPhoto(company.photos as any);
      view.backImage = this.util.getBackPhoto(company.photos as any);
      // console.log(view);
      companyViews.push(view);
    }

    // console.log(companyViews)
    return companyViews;
  }



  async getCompaniesLocal(): Promise<Company[]> {
    return await this.localStorage.getObject('companies');
  }
  async getCompanyLocal() {
    return await this.localStorage.getObject('company');
  }

  createMessage(companyId: string, message: Message) {
    if (!companyId || !message) {
      console.log('Company Id or Message is invalid');
      return undefined;
    }
    message.companyId = companyId;
    return this.messageApi.create(message).pipe(
      map((res) => {
        console.log(res);
        return res;
      })
    );

  }


  handleError(e: any): any {
    console.log(e);
    let message = '';
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
    return throwError('System error, please report to: antiamoah890@gmail.com');
  }

}

