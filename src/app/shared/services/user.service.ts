import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, Pipe } from '@angular/core';
import { Observable, throwError, Subject, from } from 'rxjs';
import { catchError, map, filter } from 'rxjs/operators';
import { Address, MyDevice, Photo, Profile, User, UserConfig } from 'src/app/models';
import { PageInfo } from 'src/app/models/page';
import { UtilityService } from '.';

import { MyLocalStorageService } from './local-storage.service';
import { SignalService, MY_ACTION } from './signal.service';


// interface UserSearchObject {
//   score: number;
//   user: Profile;
// }

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    // private _geolocation: Geolocation,
    private store: MyLocalStorageService,
    private _signal: SignalService,
    private http: HttpClient,
  ) {
    this._signal._action$.subscribe(signal => {
      if (signal === MY_ACTION.reloadUser) {
        // Reloading user
        // this.getUserById().subscribe((_: any) => _);

      } else if (signal === MY_ACTION.reloadUsers) {

      }
    });
  }


  /****
 * ADD OR UPDATE ADDRESS
 */
  createUpdateProfile(userId: any, address: Profile) {
    if (address.id) { // perform update
      return this.http.patch<Profile>(environment.identity_api_root_url + `/users/${userId}/profile`, address).pipe(
        map(res => {
          // console.log(res);
          return address as any;
        }),
        catchError(e => this.handleError(e))
      );
    } else {
      return this.http.post<Profile>(environment.identity_api_root_url + `/users/${userId}/profile`, address).pipe(
        map(res => {
          // console.log(res);
          return res as any;
        }),
        catchError(e => this.handleError(e))
      );
    }
  }


  /****
   * ADD OR UPDATE ADDRESS
   */

  createUpdateAddress(userId: any, address: Address) {
    if (address.id) { // perform update
      return this.http.patch<Address>(environment.identity_api_root_url + `/users/${userId}/address`, address).pipe(
        map(res => {
          // console.log(res);
          return address as any;
        }),
        catchError(e => this.handleError(e))
      );
    } else {
      return this.http.post<Address>(environment.identity_api_root_url + `/users/${userId}/address`, address).pipe(
        map(res => {
          // console.log(res);
          return res as any;
        }),
        catchError(e => this.handleError(e))
      );
    }
  }




  createUser() {

  }

  updateUser() {

  }


  // Quick user peep
  getMe() {
    return this.http.get<User>(environment.identity_api_root_url + '/users/me').pipe(
      map(res => {
        /** Save the authentication token **/
        this.store.setObject('user', res);
        return res as any;
      }),
      catchError(e => this.handleError(e))
    );
  }

  // Get currently logged-in user details
  getMyProfile() {
    return this.http.get<User>(environment.identity_api_root_url + '/users/my-profile').pipe(
      map(res => {
        /** Save user to local object **/
        this.setLoggedUserLocalSync(res);
        return res as any;
      }),
      catchError(e => this.handleError(e))
    );
  }

  getUsers(pageInfo?: PageInfo): Observable<any> {
    let filter;
    if (pageInfo) {
      filter = {
        order: 'id DESC',
        // offset: pageInfo.offset * pageInfo.limit,
        limit: pageInfo.limit,
        skip: pageInfo.offset,
      };
    }
    filter = filter ? '?filter=' + JSON.stringify(filter) : '';
    const url = environment.identity_api_root_url + '/users' + filter;
    // console.log(url);
    return this.http.get<User[]>(url).pipe(
      map((res: User[]) => {
        // console.log(res);
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }



  getUsersByIds(ids: string[], pageInfo?: PageInfo) {
    let filter: any;
    if (pageInfo) {
      filter = {
        offset: pageInfo.offset * pageInfo.limit,
        limit: pageInfo.limit,
        where: {
          id: { inq: ids }
        },
      };
    } else {
      filter = {
        where: {
          id: { inq: ids }
        },
      }
    }

    // filter.include =  [
    //   {
    //     relation: 'profilePhoto'
    //   }
    // ]
    //   { relation: 'address' },
    //   {
    //     relation: 'profile',
    //   },
    //   {
    //     relation: 'device'
    //   },
    //   {
    //     relation: 'userConfigs'
    //   }
    // ]
    filter = filter ? '?filter=' + JSON.stringify(filter) : '';
    const url = environment.identity_api_root_url + '/users' + filter;
    // console.log(url);
    return this.http.get<User[]>(url).pipe(
      map(res => {
        console.log(res);
        return res as any;
      }),
      catchError(e => this.handleError(e))
    );
  }

  getUserDetails(userId: any, filter?: any, isCurrentUser = true) {
    if (!filter) {
      filter = {
        include: [
          // { relation: 'photos' },
          // {
          //   relation: 'devices',
          //   scope: {
          //     include: [
          //       {
          //         relation: 'topics'
          //       }
          //     ]
          //   }
          // },
          // { relation: 'address' },
          // { relation: 'userConfigs' },
          // { relation: 'post' },
          // {
          //   relation: 'alumni',
          //   scope: {
          //     include: [
          //       {
          //         relation: 'school',
          //         // scope: {
          //         //   include: [
          //         //     { relation: 'photos' }]
          //         // }
          //       }
          //     ]
          //   }
          // }
        ]
      };
    }
    const url = environment.identity_api_root_url + `/users/${userId}?filter=` + JSON.stringify(filter);
    return this.http.get<User>(url).pipe(
      map(res => {
        // console.log(res);
        // if (isCurrentUser) {
        //   this.setUserLocal(res).then(_ => _);
        //   this.signals.announceCurrentUser(res);
        // } else {
        //   this.setSelectedUserLocal(res);
        // }

        return res as any;
      }),
      catchError(e => this.handleError(e))
    );
  }


  getUserProfile(userId: any) {
    const filter = {
      // include: [
      //   {
      //     relation: 'profilePhoto'
      //   },
      //   { relation: 'address' },
      //   {
      //     relation: 'profile',
      //   },
      //   {
      //     relation: 'device'
      //   },
      //   {
      //     relation: 'userConfigs'
      //   }
      // ]
    };
    const url = environment.identity_api_root_url + `/users/${userId}`;
    return this.http.get<User[]>(url).pipe(
      map(res => {
        // console.log(res);
        return res as any;
      }),
      catchError(e => this.handleError(e))
    );
  }



  countUsers() {
    return this.http.get<User[]>(environment.identity_api_root_url + '/users/count').pipe(
      map(res => {
        if (res) {
          return res as any;
        }
        return 0;
      }),
      catchError(e => this.handleError(e))
    );
  }


  searchUser(searchKey = 'all', pageInfo?: PageInfo) {
    let filter = {};
    if (pageInfo) {
      filter = {
        // offset: pageInfo.offset,
        limit: pageInfo.limit,
        skip: pageInfo.offset
      };
    }
    if (!searchKey) {
      searchKey = 'all';
    }
    const url = environment.identity_api_root_url + '/users-search/' + searchKey + '?filter=' + JSON.stringify(filter) ?? '';
    // console.log(url);
    return this.http.get<User[]>(url).pipe(
      map(res => {
        // console.log(res);
        return res as any;
      }),
      catchError(e => this.handleError(e))
    );
  }



  /***************************************************
   *  USER CONFIGURATION
   ****************************************************/
  createOrUpdateConfig(userId: any, cfg: UserConfig) {
    if (cfg.id) { // perform update
      return this.http.patch<UserConfig>(environment.identity_api_root_url + `/users/${userId}/user-configs`, cfg).pipe(
        map(res => {
          // console.log(res);
          return cfg as any;
        }),
        catchError(e => this.handleError(e))
      );
    } else {
      return this.http.post<UserConfig>(environment.identity_api_root_url + `/users/${userId}/user-configs`, cfg).pipe(
        map(res => {
          // console.log(res);
          return res as any;
        }),
        catchError(e => this.handleError(e))
      );
    }
  }

  getConfig(userId: any) {
    return this.http.get<UserConfig>(environment.identity_api_root_url + `/users/${userId}/user-configs`).pipe(
      map(res => {
        console.log(res);
        return res as any;
      }),
      catchError(e => this.handleError(e))
    );
  }

  deleteConfig(userId: any, cfg: UserConfig) {
    const where = {
      id: cfg.id
    };
    return this.http.delete<UserConfig>(environment.identity_api_root_url + `/users/${userId}/user-configs?where=${where}`).pipe(
      map(res => {
        console.log(res);
        return res as any;
      }),
      catchError(e => this.handleError(e))
    );
  }




  /*****************************************************************
     * CREATE DEVICE
     *****************************************************************/
  getUserDevice(userId: any) {
    const filter = {
      include: [
        { relation: 'topics' }
      ],
      where: {
        playerId: userId
      }
    };
    return this.http.get<MyDevice>(environment.identity_api_root_url + `/devices?filter=${JSON.stringify(filter)}`).pipe(
      map(res => {
        console.log(res);
        return res as any;
      }),
      catchError(e => this.handleError(e))
    );
  }

  createOrUpdateDevice(device: MyDevice) {
    if (device.id) { // perform update
      return this.http.patch<MyDevice>(environment.identity_api_root_url + `/devices/${device.id}`, device).pipe(
        map(res => {
          // console.log(res);
          return device as any;
        }),
        catchError(e => this.handleError(e))
      );
    } else {
      return this.http.post<MyDevice>(environment.identity_api_root_url + `/devices/`, device).pipe(
        map(res => {
          // console.log(res);
          return res as any;
        }),
        catchError(e => this.handleError(e))
      );
    }
  }

  // // arg: User current Identity id if id is not specified
  // getUserById(id: any = null) {
  //   if (!id) {
  //     id = this._myUserApi.getCurrentId();
  //   }
  //   // console.log(id);
  //   const filter = {
  //     fields: ['id', 'phone', 'email', 'username', 'dateCreated'],
  //     include: [
  //       {
  //         relation: 'employees'
  //       },
  //       {
  //         relation: 'profile',
  //         scope: {
  //           // further filter the owner object
  //           include: [
  //             { relation: 'address' },
  //             {
  //               relation: 'photo'
  //             }
  //           ]
  //         }
  //       },
  //       {
  //         relation: 'fcmDevices'
  //       }
  //     ]
  //   };

  //   return this._myUserApi.findById<MyUser>(id, filter).pipe(
  //     map(res => {
  //       // console.log(res);
  //       // this._localStore.setObject('user', res).then(_ => {
  //       //   this._signal.sendAction(MY_ACTION.userLoaded);
  //       // });
  //       return res;
  //     }),
  //     catchError(e => this.handleError(e))
  //   );
  // }






  // // arg: User current Identity id if id is not specified
  getUserByEmail(email?: string) {
    if (!email) {
      return undefined;
    }
    const filter = {
      fields: ['id', 'phone', 'email'],
      where: {
        email
      },
      include: [
        // {
        //   relation: 'employees'
        // },
        {
          relation: 'profilePhoto'
        },
        { relation: 'address' },
        {
          relation: 'profile',
        },
        {
          relation: 'device'
        }
      ]
    };

    return this.http.get<User>(environment.identity_api_root_url + `/devices?filter=${JSON.stringify(filter)}`).pipe(
      map(res => {
        console.log(res);
        return res as any;
      }),
      catchError(e => this.handleError(e))
    );
  }


  // getSocialmyUserById(id: string = null) {
  //   return this._myUserApi.findById(id).pipe(
  //     map(res => {
  //       // console.log(res);
  //       return res;
  //     }),
  //     catchError(e => this.handleError(e))
  //   );
  // }


  // countUsers() {
  //   return this.profileApi.count().pipe(
  //     map(res => {
  //       console.log(res);
  //       if (res) {
  //         return res.count;
  //       }
  //       return 0;
  //     }));
  // }

  // // get user details
  // getUserdetails(profileId: string): Observable<any> {
  //   const filter = {
  //     include: [
  //       {
  //         relation: 'myUser',
  //         scope: {
  //           fields: ['id', 'phone', 'email', 'username', 'created'],
  //           include: [
  //             {
  //               relation: 'employees'
  //             }
  //           ]
  //         }
  //       },
  //       {
  //         relation: 'address'
  //       },
  //       {
  //         relation: 'photo'
  //       }]
  //   };
  //   return this.profileApi.findById(profileId, filter).pipe(
  //     map(res => {
  //       console.log(res);
  //       return res;
  //     }),
  //     catchError(e => this.handleError(e))
  //   );
  // }

  // getUsersByIds(ids: string[], skip = 0, limit = 1000, country: string = null, state: string = null, city: string = null) {
  //   const where = <any>{};
  //   if (country) {
  //     where.country = country;
  //   }
  //   if (state) {
  //     where.state = state;
  //   }
  //   if (city) {
  //     where.city = city;
  //   }
  //   if (!ids && ids.length <= 0) {
  //     return;
  //   }
  //   const filter = {
  //     where: {
  //       id: { inq: ids }
  //     },
  //     include: [
  //       {
  //         relation: 'employees'
  //       },
  //       {
  //         relation: 'profile',
  //         scope: {
  //           include: [
  //             {
  //               relation: 'address',
  //               scope: {
  //                 where: where
  //               }
  //             }, {
  //               relation: 'address'
  //             },
  //             {
  //               relation: 'photo'
  //             }
  //           ]
  //         }
  //       }
  //     ]
  //   };
  //   return this._myUserApi.find(filter).pipe(
  //     map(res => {
  //       console.log(res);
  //       return res;
  //     }),
  //     catchError(e => this.handleError(e))
  //   );
  // }



  // getProfile(): Observable<Profile> {
  //   return this._myUserApi.getProfile(this._myUserApi.getCurrentId());
  // }

  // /******************Get users by geopoint nested query ****************************/
  // getUsersByGeoPointNestedQuery(point: GeoPoint, skip = 0, limit = 100,
  //   maxDistanceFromPoint = null,
  //   unit = 'km') {
  //   if (!point || !point.lat) {
  //     console.log('No geopoint');
  //     // this.newUsers([]);
  //     point = { lat: 0, lng: 0 };
  //   }

  //   const filt = {
  //     order: 'id DESC',
  //     skip: skip,
  //     limit: limit,
  //     include: [
  //       {
  //         relation: 'myUser',
  //         scope: {
  //           fields: ['id', 'phone', 'email', 'username', 'created'],
  //           include: [
  //             {
  //               relation: 'employees'
  //             }
  //           ]
  //         }
  //       },
  //       {
  //         relation: 'albums'
  //       },
  //       {
  //         relation: 'location'
  //       },
  //       {
  //         relation: 'location',
  //         scope: {
  //           where:
  //           {
  //             gmap: {
  //               near: point,
  //               maxDistance: maxDistanceFromPoint,
  //               unit: unit
  //             }
  //           },
  //         }
  //       },
  //       // {
  //       //   relation: 'eventBookmarks'
  //       // },
  //       // {
  //       //   relation: 'assets'
  //       // },
  //       // {
  //       //   relation: 'purchasedTickets'
  //       // },
  //       {
  //         relation: 'name', // include the owner object
  //         scope: {
  //           fields: ['id', 'title', 'first', 'last', 'other']
  //         }
  //       }]
  //   };

  //   return this.profileApi.find<Profile>(filt).pipe(
  //     map(res => {

  //       return res;
  //     })
  //   );


  // }

  // /***************************Fetch 200 users at a time *********************/
  // fetchUserProfiles(skip: number = 0, limit = 200) {
  //   const filt = {
  //     order: 'id DESC',
  //     limit: limit,
  //     skip: skip,
  //     // where: {
  //     //   dateCreated: { lt: new Date(Date.now() - (this.ONE_MONTH * months)) }
  //     // },
  //     include: [
  //       {
  //         relation: 'myUser',
  //         scope: {
  //           fields: ['id', 'phone', 'email', 'username', 'created'],
  //           include: [
  //             {
  //               relation: 'employees'
  //             }
  //           ]
  //         }
  //       },
  //       {
  //         relation: 'albums'
  //       },
  //       {
  //         relation: 'location'
  //       },
  //       // {
  //       //   relation: 'eventBookmarks'
  //       // },
  //       {
  //         relation: 'assets'
  //       },
  //       {
  //         relation: 'purchasedTickets'
  //       },
  //       {
  //         relation: 'name', // include the owner object
  //         scope: {
  //           // further filter the owner object
  //           fields: ['id', 'title', 'first', 'last', 'other'] // only show two fields

  //         }
  //       }]
  //   };
  //   return this.profileApi.find<Profile>(filt).pipe(
  //     map(res => {
  //       console.log(res);
  //       return res;
  //     })
  //   );
  // }

  // getUserProfileByUserId(myUserId: any) {
  //   const filt = {
  //     where: {
  //       myUserId
  //     },
  //     include: [
  //       {
  //         relation: 'myUser',
  //         scope: {
  //           fields: ['id', 'phone', 'email', 'username', 'created'],
  //           include: [
  //             {
  //               relation: 'employees'
  //             }
  //           ]
  //         }
  //       },
  //       {
  //         relation: 'photo'
  //       },
  //       {
  //         relation: 'address'
  //       }
  //     ]
  //   };
  //   return this.profileApi.findOne<Profile>(filt).pipe(
  //     map(res => {
  //       console.log(res);
  //       return res;
  //     })
  //   );
  // }

  // // Not profile id
  // deleteUser(myUserId: string) {
  //   return this._myUserApi.deleteById(myUserId).pipe(
  //     map(res => {
  //       console.log(res);
  //       return res;
  //     }),
  //     catchError(e => this.handleError(e))
  //   );
  // }




  // /***************PHOTO MANAGEMENT FUNCTION  **************/
  updateProfilePhoto(userId: string, photo: Photo): Observable<any> {
    if (!photo.fileId || !userId) {
      return undefined as any;
    }
    const url = `${environment.identity_api_root_url}/users/${userId}/profile-photo`
    return this.http.post<Photo>(url, photo).pipe(
      map(res => {
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }


  // /*************************LOCAL FUNCTION****************/


  // /* get logged in user details */
  // async getUserLocal(): Promise<MyUser> {
  //   return await this._localStore.getObject('user');
  // }
  // saveUserLocal(user: MyUser) {
  //   this._localStore.setObject('user', user).then(_ => _);
  // }

  // // User currently in scope. Not the logged in user
  // async getSelectedUser(): Promise<Profile> {
  //   return await this._localStore.getObject('selected_user');
  // }
  // saveSelectedUserLocal(user: Profile) {
  //   this._localStore.setObject('selected_user', user).then(_ => _);
  // }

  // removeSelectedUserLocal() {
  //   this._localStore.remove('selected_user');
  // }

  // async getUsersLocal() {
  //   return await this._localStore.getObject('users');
  // }

  // saveUsersLocal(profiles: Profile[]) {
  //   this._localStore.setObject('users', profiles).then(_ => {
  //     console.log('Users updated');
  //     this._signal.sendAction(MY_ACTION.usersLoaded);
  //   });
  // }

  // parseMyUserToProfile(user: MyUser): Profile {
  //   if (!user) {
  //     return;
  //   }
  //   let profile = user.profile;
  //   if (!profile) {
  //     profile = new Profile();
  //   }
  //   profile.myUser = user;
  //   profile.myUser.profile = null;
  //   return profile;
  // }

  // parseProfileToMyUser(profile: Profile): MyUser {
  //   if (!profile) {
  //     return;
  //   }
  //   let user = profile.myUser;
  //   if (!user) {
  //     user = new MyUser();
  //   }
  //   user.profile = profile;
  //   user.profile.myUser = null;
  //   return user;
  // }

  // filterUsers(key: string, users: Profile[]) {
  //   // phone
  //   // email
  //   // address
  //   // name

  //   if (!users) {
  //     console.log('users are not array');
  //     return;
  //   }
  //   key = key.trim().toLowerCase();
  //   return users.filter((user, index) => {
  //     if (user.myUser) {
  //       if (user.myUser.email.toLowerCase().trim().search(key) > -1 ||
  //         user.myUser.phone.toLowerCase().trim().search(key) > -1 ||
  //         user.myUser.dateCreated.toString().toLowerCase().trim().search(key) > -1) {
  //         return true;
  //       }
  //     }
  //     if (user.fname.toLowerCase().trim().search(key) > -1 ||
  //       user.lname.toLowerCase().trim().search(key) > -1 ||
  //       user.gender.toLowerCase().trim().search(key) > -1 ||
  //       user.about.toLowerCase().trim().search(key) > -1 ||
  //       user.dob.toString().toLowerCase().trim().search(key) > -1) {
  //       return true;
  //     }

  //     if (user && user.address) {
  //       if (user.address.appartment.toLowerCase().trim().search(key) > -1 ||
  //         user.address.city.toLowerCase().trim().search(key) > -1 ||
  //         user.address.postcode.toLowerCase().trim().search(key) > -1 ||
  //         user.address.street.toLowerCase().trim().search(key) > -1 ||
  //         user.address.state.toLowerCase().trim().search(key) > -1 ||
  //         user.address.country.toLowerCase().trim().search(key) > -1) {
  //         return true;
  //       }
  //     }
  //     return false;
  //   });
  // }



  /////////////////////////////////////////////////////////////////////////
  /*************Local user access*****/
  ///////////////////////////////////////////////////////////////////////////



  // Read user object from session storage
  async getLoggedUserLocal(): Promise<User> {
    return await this.store.getObject('logged_user');
  }
  getLoggedUserLocalSync(): User {
    return this.store.getObjectSync('logged_user');
  }

  async setLoggedUserLocal(user: User) {
    return await this.store.setObject('logged_user', user);
  }
  setLoggedUserLocalSync(user: User) {
    return this.store.setObjectSync('logged_user', user);
  }
  deleteLoggedUserLocal() {
    this.store.remove('logged_user');
  }




  async getSelectedUserLocal(): Promise<User> {
    return await this.store.getObject('selected_user');
  }
  getSelectedUserLocalSync(): User {
    return this.store.getObjectSync('selected_user');
  }

  async setSelectedUserLocal(user: User) {
    return await this.store.setObject('selected_user', user);
  }

  deleteUserLocal() {
    this.store.remove('user');
  }



  async getUsersLocal(): Promise<User[]> {
    return await this.store.getObject('users');
  }
  getUsersLocalSync(): User[] {
    return this.store.getObjectSync('users');
  }

  async setUsersLocal(users: User[]) {
    return await this.store.setObject('users', users);
  }

  deleteUsersLocal() {
    this.store.remove('users');
  }



  getSetLoggedUserRolesLocalSync(): string[] {
    return this.store.getObjectSync('logged_user_roles');
  }
  setLoggedUserRolesLocal(roles: string[]) {
    return this.store.setObjectSync('logged_user_roles', roles);
  }

  getSetSelectedUserRolesLocalSync(): string[] {
    return this.store.getObjectSync('selected_user_roles');
  }
  setSelectedUserRolesLocal(roles: string[]) {
    return this.store.setObjectSync('selected_user_roles', roles);
  }


  private handleError(e: any): any {
    // console.log(e);
    return throwError(UtilityService.myHttpErrorFormat(e, 'user'));
  }
}
