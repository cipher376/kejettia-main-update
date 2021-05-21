import { Injectable } from '@angular/core';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, map, filter } from 'rxjs/operators';
import {
  Profile, ProfileApi, MyUserApi, GeoPoint, MyUser,
  Address, RoleMapping, RoleMappingApi, Photo
} from '../identity-sdk';
import { MyLocalStorageService } from './local-storage.service';
import { SignalService, MY_ACTION } from './signal.service';


interface UserSearchObject {
  score: number;
  user: Profile;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  ONE_MONTH = 30 * 24 * 60 * 60 * 1000; // 1 month in millisecons


  constructor(
    private _myUserApi: MyUserApi,
    // private _geolocation: Geolocation,
    private profileApi: ProfileApi,
    private _localStore: MyLocalStorageService,
    private _signal: SignalService,
    private _roleMappings: RoleMappingApi
  ) {
    this._signal._action$.subscribe(signal => {
      if (signal === MY_ACTION.reloadUser) {
        // Reloading user
        this.getUserById().subscribe(_ => _);

      } else if (signal === MY_ACTION.reloadUsers) {

      }
    });
  }



    /***************PHOTO MANAGEMENT FUNCTION  **************/
    updateProfilePhoto(profileId: any, photo: Photo) {
      // delete existing photo
      return new Promise<Photo>((resolve, reject) => {
        this.profileApi.destroyPhoto(profileId).pipe(
          map(res => {
            console.log(res);
            // create new photo;
            photo.id = null;
            return res;
          }),
          catchError(e => this.handleError(e))
        ).subscribe(_ => _);
        setTimeout(() => {
          this.profileApi.createPhoto(profileId, photo).pipe(
            map(ph => {
              resolve(ph);
              return ph;
            }),
            catchError(e => this.handleError(e))
          ).subscribe(_ => _);
        }, 500);
      });
    }

  getUsersRemote(skip = 0, limit = 1000, country: string = null, state: string = null, city: string = null) {
    const where = <any>{};
    if (country) {
      where.country = country;
    }
    if (state) {
      where.state = state;
    }
    if (city) {
      where.city = city;
    }

    const filter = {
      order: 'id DESC',
      limit: limit,
      skip: skip,
      fields: ['id', 'phone', 'email', 'username', 'created'],
      include: [
        {
          relation: 'profile',
          scope: {
            include: [
              {
                relation: 'address',
                scope: {
                  where: where
                }
              }, {
                relation: 'address'
              },
              {
                relation: 'photo'
              }
            ]
          }
        }
      ]
    };
    return this._myUserApi.find<MyUser>(filter).pipe(
      map((res: MyUser[]) => {
        console.log(res);
        const profiles: Profile[] = [];
        res.forEach(user => {
          const profile = (user.profile || <Profile>{});
          user.profile = null;
          profile.myUser = user;
          profile.myUserId = user.id;
          profiles.push(profile);
        });
        if (profiles && profiles.length > 0) {
          this.saveUsersLocal(profiles);
        }
        return profiles;
      }),
      catchError(e => this.handleError(e))
    );

  }

  saveProfile(profile: Profile) {
    if (profile.id) {
      return this._myUserApi.updateProfile(this._myUserApi.getCurrentId(), profile).pipe(
        map(res => {
          return <Profile>res;
        }),
        catchError(e => this.handleError(e))
      );
    } else {
      return this._myUserApi
        .createProfile(this._myUserApi.getCurrentId(), profile)
        .pipe(
          map(res => {
            return res;
          }),
          catchError(e => this.handleError(e))
        );
    }
  }

  /**************Add Address to the user *********/
  saveAddress(data: Address): Observable<Address | {}> {
    if (!data.profileId) {
      throwError('User location should have valid profile id');
      return undefined;
    }
    if (!data.id) {
      return this.profileApi.createAddress(data.profileId, data).pipe(
        map(res => {
          console.log(res);
          const loc: Address = res;

          return loc;
        }),
        catchError((e) => this.handleError(e))
      );
    } else {
      return this.profileApi.updateAddress(data.profileId, data).pipe(
        map(res => {
          console.log(res);
          const loc: Address = res;
          return loc;
        }),
        catchError((e) => this.handleError(e))
      );
    }
  }


  // arg: User current Identity id if id is not specified
  getUserById(id: string = null) {
    if (!id) {
      id = this._myUserApi.getCurrentId();
    }
    console.log(id);
    const filter = {
      fields: ['id', 'phone', 'email', 'username', 'dateCreated'],
      include: [
        {
          relation: 'profile',
          scope: {
            // further filter the owner object
            include: [
              { relation: 'address' },
              {
                relation: 'photo'
              }
            ]
          }
        },
        {
          relation: 'fcmDevices'
        }
      ]
    };

    return this._myUserApi.findById<MyUser>(id, filter).pipe(
      map(res => {
        console.log(res);
        this._localStore.setObject('user', res).then(_ => {
          this._signal.sendAction(MY_ACTION.userLoaded);
        });
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }

  getSocialmyUserById(id: string = null) {
    return this._myUserApi.findById(id).pipe(
      map(res => {
        // console.log(res);
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }


  countUsers() {
    return this.profileApi.count().pipe(
      map(res => {
        console.log(res);
        if (res) {
          return res.count;
        }
        return 0;
      }));
  }

  // get user details
  getUserdetails(profileId: string): Observable<any> {
    const filter = {
      include: [
        {
          relation: 'myUser',
          scope: {
            fields: ['id', 'phone', 'email', 'username', 'created'],
          }
        },
        {
          relation: 'address'
        },
        {
          relation: 'photo'
        }]
    };
    return this.profileApi.findById(profileId, filter).pipe(
      map(res => {
        console.log(res);
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }

  getUsersByIds(ids: string[], skip = 0, limit = 1000, country: string = null, state: string = null, city: string = null) {
    const where = <any>{};
    if (country) {
      where.country = country;
    }
    if (state) {
      where.state = state;
    }
    if (city) {
      where.city = city;
    }
    if (!ids && ids.length <= 0) {
      return undefined;
    }
    const filter = {
      where: {
        id: { inq: ids }
      },
      include: [
        {
          relation: 'profile',
          scope: {
            include: [
              {
                relation: 'address',
                scope: {
                  where: where
                }
              }, {
                relation: 'address'
              },
              {
                relation: 'photo'
              }
            ]
          }
        }
      ]
    };
    return this._myUserApi.find(filter).pipe(
      map(res => {
        console.log(res);
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }



  getProfile(): Observable<Profile> {
    return this._myUserApi.getProfile(this._myUserApi.getCurrentId());
  }

  /******************Get users by geopoint nested query ****************************/
  getUsersByGeoPointNestedQuery(point: GeoPoint, skip = 0, limit = 100,
    maxDistanceFromPoint = null,
    unit = 'km') {
    if (!point || !point.lat) {
      console.log('No geopoint');
      // this.newUsers([]);
      point = { lat: 0, lng: 0 };
    }

    const filt = {
      order: 'id DESC',
      skip: skip,
      limit: limit,
      include: [
        {
          relation: 'identity',
          scope: {
            fields: ['id', 'phone', 'email', 'username', 'created'],
          }
        },
        {
          relation: 'albums'
        },
        {
          relation: 'location'
        },
        {
          relation: 'location',
          scope: {
            where:
            {
              gmap: {
                near: point,
                maxDistance: maxDistanceFromPoint,
                unit: unit
              }
            },
          }
        },
        // {
        //   relation: 'eventBookmarks'
        // },
        // {
        //   relation: 'assets'
        // },
        // {
        //   relation: 'purchasedTickets'
        // },
        {
          relation: 'name', // include the owner object
          scope: {
            fields: ['id', 'title', 'first', 'last', 'other']
          }
        }]
    };

    return this.profileApi.find<Profile>(filt).pipe(
      map(res => {

        return res;
      })
    );


  }

  /***************************Fetch 200 users at a time *********************/
  fetchUserProfiles(skip: number = 0, limit = 200) {
    const filt = {
      order: 'id DESC',
      limit: limit,
      skip: skip,
      // where: {
      //   dateCreated: { lt: new Date(Date.now() - (this.ONE_MONTH * months)) }
      // },
      include: [
        {
          relation: 'identity',
          scope: {
            fields: ['id', 'phone', 'email', 'username', 'created'],
          }
        },
        {
          relation: 'albums'
        },
        {
          relation: 'location'
        },
        // {
        //   relation: 'eventBookmarks'
        // },
        {
          relation: 'assets'
        },
        {
          relation: 'purchasedTickets'
        },
        {
          relation: 'name', // include the owner object
          scope: {
            // further filter the owner object
            fields: ['id', 'title', 'first', 'last', 'other'] // only show two fields

          }
        }]
    };
    return this.profileApi.find<Profile>(filt).pipe(
      map(res => {
        console.log(res);
        return res;
      })
    );
  }

  // Not profile id
  deleteUser(myUserId: string) {
    return this._myUserApi.deleteById(myUserId).pipe(
      map(res => {
        console.log(res);
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }



  /*************************LOCAL FUNCTION****************/
  async getUser() {
    return await this._localStore.getObject('user');
  }

  async getUsersLocal() {
    return await this._localStore.getObject('users');
  }

  saveUsersLocal(profiles: Profile[]) {
    this._localStore.setObject('users', profiles).then(_ => {
      console.log('Users updated');
      this._signal.sendAction(MY_ACTION.usersLoaded);
    });
  }

  async getUserLocal(): Promise<MyUser> {
    return await this._localStore.getObject('user');
  }

  clearUserLocal() {
    this._localStore.remove('user').then(_ => _);
  }


  filterUsers(key: string, users: Profile[]) {
    // phone
    // email
    // address
    // name

    if (!users) {
      console.log('users are not array');
      return '';
    }
    key = key.trim().toLowerCase();
    return users.filter((user, index) => {
      if (user.myUser) {
        if (user.myUser.email.toLowerCase().trim().search(key) > -1 ||
          user.myUser.phone.toLowerCase().trim().search(key) > -1 ||
          user.myUser.dateCreated.toString().toLowerCase().trim().search(key) > -1) {
          return true;
        }
      }
      if (user.fname.toLowerCase().trim().search(key) > -1 ||
        user.lname.toLowerCase().trim().search(key) > -1 ||
        user.gender.toLowerCase().trim().search(key) > -1 ||
        user.about.toLowerCase().trim().search(key) > -1 ||
        user.dob.toString().toLowerCase().trim().search(key) > -1) {
        return true;
      }

      if (user && user.address) {
        if (user.address.appartment.toLowerCase().trim().search(key) > -1 ||
          user.address.city.toLowerCase().trim().search(key) > -1 ||
          user.address.postcode.toLowerCase().trim().search(key) > -1 ||
          user.address.street.toLowerCase().trim().search(key) > -1 ||
          user.address.state.toLowerCase().trim().search(key) > -1 ||
          user.address.country.toLowerCase().trim().search(key) > -1) {
          return true;
        }
      }
      return false;
    });
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
