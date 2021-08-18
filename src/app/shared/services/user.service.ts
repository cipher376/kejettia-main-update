import { DeliveryAddress } from './../../models/delivery-address';
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


  getUserDeliveryAddress(userId: any) {
    if (!userId) {
      console.log('User id required')
      return undefined;
    }
    return this.http.get<DeliveryAddress[]>(environment.store_api_root_url + `/users/${userId}/delivery-addresses`).pipe(
      map(res => {
        console.log(res);
        const user = this.getLoggedUserLocalSync();
        user.otherDeliveryAddresses = res;
        this.setLoggedUserLocalSync(user);
        return res as any;
      }),
      catchError(e => this.handleError(e))
    );
  }

  createUpdateUserDeliveryAddress(userId: any, deliveryAddress: DeliveryAddress) {
    if (!deliveryAddress?.address?.state || !userId) {
      console.log('Address is invalid');
      alert('Please complete every address field');
      return undefined
    }
    const address = deliveryAddress.address;
    delete deliveryAddress.address;
    console.log(address);
    if (deliveryAddress.id) { // perform update
      return this.http.patch<DeliveryAddress>(environment.store_api_root_url + `/users/${userId}/delivery-addresses`, deliveryAddress).pipe(
        map(res => {
          // console.log(res);
          this.http.patch<Address>(environment.store_api_root_url + `/delivery-addresses/${deliveryAddress.id}/address`, address).subscribe(() => { })
          deliveryAddress.address = address;
          return deliveryAddress as any;
        }),
        catchError(e => this.handleError(e))
      );
    } else {
      return this.http.post<DeliveryAddress>(environment.store_api_root_url + `/users/${userId}/delivery-addresses`, deliveryAddress).pipe(
        map(res => {
          // console.log(res);
          this.http.post<Address>(environment.store_api_root_url + `/delivery-addresses/${res.id}/address`, address).subscribe(() => { })
          res.address = address;
          return res as any;
        }),
        catchError(e => this.handleError(e))
      );
    }
  }



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



  getLoggedUserRolesLocalSync(): string[] {
    return this.store.getObjectSync('logged_user_roles');
  }
  setLoggedUserRolesLocal(roles: string[]) {
    return this.store.setObjectSync('logged_user_roles', roles);
  }

  getSelectedUserRolesLocalSync(): string[] {
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
