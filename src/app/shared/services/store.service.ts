import { UtilityService } from './utility.service';
import { Injectable } from '@angular/core';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, map, filter, max } from 'rxjs/operators';
import { MyLocalStorageService } from './local-storage.service';
import {
  StoreApi, Store, StoreAddressApi, ProductItem,
  ProductItemApi, ProductCategoryApi, ProductCategory, Photo,
  PhotoApi,
  GeoPoint
} from '../store-sdk';
import { SignalService, MY_ACTION } from './signal.service';
import { SearchKey, SearchObject } from '../models/search';

export interface StoreView {
  id: string;
  addressId: string;
  name: string;
  type: StoreType;
  url: string;
  coverImage: string;
  smallImage: string;
  frontImage: string;
  backImage: string;
  anyImage: string;
  logoImage: string;
  country: string;
  state: string;
  city: string;
  suburb: string;
  street: string;
  lat?: number;
  lng?: number;
  createdOn: Date;
  modifiedOn: Date;
  rate: number;
  totalSalesCount: number;
  photos: Photo[];
}


export interface StoreType {
  id: number;
  name: string;
}
export const STORE_TYPES: StoreType[] = [
  { id: 1, name: 'Supermarkets' },
  { id: 2, name: 'Department Stores' },
  { id: 3, name: 'Mall' },
  { id: 4, name: 'Discount Retailer' },
  { id: 5, name: 'Convenience Store' },
  { id: 6, name: 'Warehouse' },
  { id: 7, name: 'Whole sale' },
  { id: 8, name: 'Drug Store' },
  { id: 9, name: 'Used Goods Store' },
  { id: 10, name: 'Electronic shop' },
  { id: 11, name: 'Garage' },
  { id: 12, name: 'Tools shop' },
  { id: 13, name: 'Construction material shop' },
  { id: 14, name: 'Clothings store' },
  { id: 15, name: 'Footwear shop' },
  { id: 16, name: 'Food store' },
  { id: 17, name: 'Food store' },
  { id: 18, name: 'Hospital equipment shop' },
  { id: 19, name: 'Heavy duty equipment' }
];

interface SalesCountLimit {
  max: number;
  min: number;
}
@Injectable({
  providedIn: 'root'
})
export class StoreService {

  ONE_MONTH = 30 * 24 * 60 * 60 * 1000; // 1 month in millisecons
  TOP_STORE_AVERAGE = 3;


  constructor(
    private _fstore: MyLocalStorageService,
    private _storeApi: StoreApi,
    private _storeAddressApi: StoreAddressApi,
    private _productApi: ProductItemApi,
    private _catApi: ProductCategoryApi,
    private _localStorage: MyLocalStorageService,
    private _signalService: SignalService,
    private _photoApi: PhotoApi,
    private _util: UtilityService
  ) {

  }


  getStores(skip = 0, limit = 1000, country: string = null, state: string = null, city: string = null, suburb: string = null) {
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
          relation: 'address',
        },
        {
          relation: 'photos'
        },
        {
          relation: 'productCategories'
        }
      ]
    } as any;


    return this._storeApi.find(filter).pipe(
      map((res: Store[]) => {
        this.saveStoresLocal(res);
        return res;
      }), catchError((e) => this.handleError(e))
    );
  }

  getStoresByGeopoint(point: GeoPoint, skip = 0, limit = 1000, maxDistanceFromPoint = 4000,
    unit = 'kilometers') {
    const where = {
      gmap: {
        near: point,
        maxDistance: maxDistanceFromPoint,
        unit
      }
    };

    const filter = {
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
          relation: 'address',
        },
        {
          relation: 'photos'
        },
        {
          relation: 'productCategories'
        }
      ]
    } as any;
    return this._storeApi.find(filter).pipe(
      map((res: Store[]) => {
        if (res && res.length > 0) {
          console.log(res);
          this.saveStoresLocal(res);
        }
        return res;
      }), catchError((e) => this.handleError(e))
    );
  }


  getStoreById(id: any) {
    const filter = {
      include: [
        {
          relation: 'address',
        },
        {
          relation: 'photos'
        },
        {
          relation: 'productCategories'
        }
      ]
    } as any;
    return this._storeApi.findById(id, filter).pipe(
      map((res: Store) => {

        return res;
      }), catchError((e) => this.handleError(e))
    );
  }


  async storeToStoreView(stores: Store[]) {
    const storeViews: StoreView[] = [];
    for (const store of stores) {
      const view: any = {
        id: store.id,
        name: store.name,
        type: STORE_TYPES[store.type - 1] as any,
        url: store.url,
        createdOn: store.dateCreated,
        modifiedOn: store.dateModified,
        totalSalesCount: store.totalSalesCount,
        rate: await this.rateStore(store.totalSalesCount)
      };
      if (store.address) {
        view.country = store.address.country;
        view.state = store.address.state;
        view.city = store.address.city;
        view.suburb = store.address.suburb;
        view.street = store.address.street;
        view.addressId = store.address.id;
      }

      // get images
      view.coverImage = this._util.getCoverPhoto(store.photos);
      view.smallImage = this._util.getThumbnailPhoto(store.photos);
      view.frontImage = this._util.getFrontPhoto(store.photos);
      view.backImage = this._util.getBackPhoto(store.photos);
      view.anyImage = this._util.getAnyPhoto(store.photos);
      view.logoImage = this._util.getLogo(store.photos);
      // console.log(view);
      storeViews.push(view);
    }

    // console.log(storeViews)
    return storeViews;
  }

  // deleteStore(store: Store) {
  //   return this._storeApi.deleteById(store.id).pipe(
  //     map((res) => {
  //       this._signalService.sendAction(MY_ACTION.reloadStores);
  //       return res;
  //     }), catchError((e) => this.handleError(e))
  //   );
  // }


  filterStores(key: string, stores: Store[]) {
    if (!stores) {
      console.log('Stores are not array');
      return [];
    }
    key = key.trim().toLowerCase();
    return stores.filter((store, index) => {
      if (store.name.toLowerCase().trim().search(key) > -1 ||
        store.url.toLowerCase().trim().search(key) > -1 ||
        store.type.toString().toLowerCase().trim().search(key) > -1) {
        return true;
      }

      if (store && store.address) {
        if (store.address.appartment.toLowerCase().trim().search(key) > -1 ||
          store.address.city.toLowerCase().trim().search(key) > -1 ||
          store.address.postcode.toLowerCase().trim().search(key) > -1 ||
          store.address.street.toLowerCase().trim().search(key) > -1 ||
          store.address.suburb.toLowerCase().trim().search(key) > -1 ||
          store.address.state.toLowerCase().trim().search(key) > -1 ||
          store.address.country.toLowerCase().trim().search(key) > -1) {
          return true;
        }
      }
      return false;
    });
  }

  saveStoresLocal(stores: Store[]) {
    // perform rating before saving
    let max = 0; let min = 0;

    stores.forEach(store => {
      if (store.totalSalesCount > max) {
        max = store.totalSalesCount;
      } else if (store.totalSalesCount < min || min === 0) {
        min = store.totalSalesCount;
      }
    });
    this.getSalesCountLimit().then(count => {
      if (!count) {
        // create new count
        count = {} as SalesCountLimit;
        count.max = 0;
        count.min = 0;
      }
      if (count.max < max) {
        count.max = max;
      }
      if (count.min > min) {
        count.min = min;
      }
      this.setSalesCountLimit(count);
      this.storeToStoreView(stores).then(stores => {
        this._localStorage.setObject('stores', stores).then(_ => {
          console.log('Stores update on disk');
          this._signalService.sendAction(MY_ACTION.storesLoaded);
        });
      });

    });
  }
  saveSelectedStore(store: StoreView) {
    this._localStorage.setObject('selectedStore', store).then(_ => _);
  }
  async getStoresLocal(): Promise<StoreView[]> {
    return await this._localStorage.getObject('stores');
  }
  async getSelectedStoreLocal(): Promise<StoreView> {
    return await this._localStorage.getObject('selectedStore');
  }


  setSalesCountLimit(count: SalesCountLimit) {
    this._localStorage.setObject('salesCountLimits', count).then(_ => _);
  }

  async getSalesCountLimit(): Promise<SalesCountLimit> {
    return await this._localStorage.getObject('salesCountLimits');
  }

  // new stores
  sortFeaturedStores(stores: StoreView[]) {
    return (stores.sort((a, b) => {
      const a_days = this._util.calcDatesDiffInDays(a.createdOn);
      const b_days = this._util.calcDatesDiffInDays(b.createdOn);
      if (a_days < b_days) {
        return 1;
      } else if (a_days > b_days) {
        return -1;
      } else {
        return 0;
      }
    }) || []);
  }
  sortTopStores(stores: StoreView[]) {
    return (stores.sort((a, b) => {
      const av_a = a.totalSalesCount / (Math.round((this._util.calcDatesDiffInDays(a.createdOn, new Date(Date.now())) / 30) + 0.49));
      const av_b = b.totalSalesCount / (Math.round((this._util.calcDatesDiffInDays(b.createdOn, new Date(Date.now())) / 30) + 0.49));
      if (av_a > av_b) {
        return 1;
      } else if (av_a < av_b) {
        return -1;
      } else {
        return 0;
      }
    }) || []);
  }

  sortHotOffer(stores: StoreView[]) {
    return (stores.sort((a, b) => {
      const av_a = a.totalSalesCount;
      const av_b = b.totalSalesCount;
      if (av_a > av_b) {
        return 1;
      } else if (av_a < av_b) {
        return -1;
      } else {
        return 0;
      }
    }) || []);
  }

  async rateStore(salesCount: number) {
    const count = await this.getSalesCountLimit();
    return this._util.rate(salesCount, count.min, count.max);
  }







  storeSearch(searchObject: SearchKey) {
    // console.log(searchObject)
    return this._storeApi.search(searchObject).pipe(
      map((res: SearchObject[]) => {
        // console.log(res);
        return res;

      }), catchError((e) => this.handleError(e))
    );
  }

  /**********************************************************************************
  ****************  Product Services                ********************************
  ***********************************************************************************/


  getProducts(skip = 0, limit = 1000, gift = false, salesCount = 0, priceStart = 0, priceEnd = 10000000000) {
    const where = {} as any;
    if (gift) {
      where.gift = gift;
    }
    if (salesCount > 0) {
      where.salesCount = { gte: salesCount };
    }
    if (priceStart > 0) {
      where.currentPrice = { gte: priceStart };
    }

    if (priceEnd > 0) {
      where.currentPrice = { lte: priceEnd };
    }

    const filter = {
      order: 'id DESC',
      limit,
      skip,
      where,
      include: [
        {
          relation: 'favourites',
        },
        {
          relation: 'productCategory',
        },
        {
          relation: 'photos'
        }
      ]
    } as any;

    console.log(filter);

    return this._productApi.find<ProductItem>(filter).pipe(
      map((res: ProductItem[]) => {
        this.saveProductsLocal(res);
        return res;
      }), catchError((e) => this.handleError(e))
    );
  }

  // deleteProduct(prod: ProductItem) {
  //   return this._productApi.deleteById(prod.id).pipe(
  //     map((res) => {
  //       return res;
  //     }), catchError((e) => this.handleError(e))
  //   );
  // }


  getProductsByStore(storeId = null, skip = 0, limit = 1000) {
    const filter = {
      order: 'id DESC',
      limit,
      skip,
      fields: ['id'],
      include: [
        {
          relation: 'productCategories',
          scope: {
            include: [
              {
                relation: 'productCategoryItems',
                scope: {
                  include: [
                    {
                      relation: 'productItem',
                      scope: {
                        include: [
                          {
                            relation: 'favourites',
                          },
                          {
                            relation: 'photos'
                          },
                        ]
                      }
                    }
                    // {
                    //   relation: 'productCategory',
                    //   scope: {
                    //     include: [
                    //       {
                    //         relation: 'store'
                    //       }
                    //     ]
                    //   }
                    // }
                  ]
                }
              }
            ]
          }
        }
      ]
    } as any;
    // console.log(filter);

    return this._storeApi.findById<Store>(storeId, filter).pipe(
      map((res: Store) => {
        console.log(res);
        const products: ProductItem[] = [];
        if (res && res.productCategories) {
          res.productCategories.forEach(cat => {
            cat.productCategoryItems.forEach(catItem => {
              // remove duplicates
              if (!(products.find((item) => {
                return item.id === catItem.productItem.id;
              }))) {
                catItem.productItem.productCategoryItems = cat.productCategoryItems;
                products.push(catItem.productItem);
                // console.log(catItem.productItem);
              }
            });
          });
        }
        // console.log(products);
        this.saveProductsLocal(products);
        return products;
      }), catchError((e) => this.handleError(e))
    );
  }


  getProductsByCategory(catId: string, skip = 0, limit = 1000) {
    // const where = <any>{};
    // if (storeId) {
    //   where.id = storeId;
    // }

    const filter = {
      order: 'id DESC',
      limit,
      skip,
      fields: ['id'],
      include: [
        {
          relation: 'productCategoryItems',
          scope: {
            include: [
              {
                relation: 'productItem',
                scope: {
                  include: [
                    {
                      relation: 'favourites',
                    },
                    {
                      relation: 'photos'
                    }
                  ]
                }
              }
            ]
          }
        }
      ]
    } as any;
    return this._catApi.findById<ProductCategory>(catId, filter).pipe(
      map((res: ProductCategory) => {
        console.log(res);
        const products: ProductItem[] = [];
        if (res && res.productCategoryItems) {
          res.productCategoryItems.forEach(catItem => {
            products.push(catItem.productItem);
          });
        }
        return products;
      }), catchError((e) => this.handleError(e))
    );
  }

  productSearch(searchObject: SearchKey) {
    return this._productApi.search(searchObject).pipe(
      map((res: SearchObject[]) => {
        // console.log(res);
        return res;
      }), catchError((e) => this.handleError(e))
    );
  }



  saveProductsLocal(prods: ProductItem[]) {
    this._localStorage.setObject('products', prods).then(_ => {
      console.log('Products update on disk');
      this._signalService.sendAction(MY_ACTION.productsLoaded);
    });
  }
  async getProductsLocal() {
    return await this._localStorage.getObject('prodducts');
  }


  /*********************************************Categories****************************** */


  getProductCategories(skip = 0, limit = 1000, storeId = null, includeStore = false, includeProducts = false) {
    const where = {} as any;
    if (storeId) {
      where.id = storeId;
    }
    const filter = {
      order: 'id DESC',
      limit,
      skip,
      include: [
        {
          relation: 'store',
          scope: {
            where
          }
        },
        {
          relation: 'photo'
        }
      ]
    } as any;

    if (includeStore) {
      filter.include.push({
        relation: 'store'
      });
    }

    if (includeProducts) {
      filter.include.push({
        relation: 'productItems'
      });
    }
    console.log(filter);

    return this._catApi.find<ProductCategory>(filter).pipe(
      map((res: ProductCategory[]) => {
        return res;
      }), catchError((e) => this.handleError(e))
    );
  }

  // deleteProductCategory(category: ProductCategory) {
  //   return this._catApi.deleteById(category.id).pipe(
  //     map((res) => {
  //       return res;
  //     }), catchError((e) => this.handleError(e))
  //   );
  // }

  filterProductCategories(key: string, cats: ProductCategory[]) {
    if (!cats) {
      console.log('Product categories are not array');
      return [];
    }
    key = key.trim().toLowerCase();
    return cats.filter((cat, index) => {
      if (cat.name.toLowerCase().trim().search(key) > -1 ||
        cat.desc.toLowerCase().trim().search(key) > -1 ||
        cat.createdAt.toString().toLowerCase().trim().search(key) > -1) {
        return true;
      }

      return false;
    });
  }


  /*************************Photos update*****************************/
  // updatePhoto()



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
    return throwError('System error, please report to: antiamoah890@gmail.com');
  }
}
