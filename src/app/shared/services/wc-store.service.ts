import { UtilityService } from 'src/app/shared/services';
import { Review } from '../../models/review';
import { NO_IMAGE } from 'src/app/config';
import { ProductCategory, ProductCategoryItem, ProductModel, ProductBrand, ProductToCategoryItemThrough } from '../../models/product';
import { HttpClient } from '@angular/common/http';
import { PolicyType } from '../../models/store-policy';
import { Injectable } from '@angular/core';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, map, filter } from 'rxjs/operators';
import { MyLocalStorageService } from './local-storage.service';
import { MY_ACTION, SignalService } from './signal.service';
import { environment } from 'src/environments/environment';
import { Address, Features, PolicyStatement, Store, StoreCategory, Shipping, StoreToCategoryThrough, Photo, Favourite } from 'src/app/models';
import { PageInfo } from 'src/app/models/page';
import { ProductShippingClass, WcCustomerShipping, WcProduct, WcProductCategory, WcProductReview, WcRequestFilter } from 'src/app/models/woocommerce.model';



@Injectable({
  providedIn: 'root'
})
export class WooCommerceStoreService {

  constructor(
    private fstore: MyLocalStorageService,
    private http: HttpClient,
    private signal: SignalService
  ) {

  }



  getWcProducts() {
    const filter: WcRequestFilter = {};

    const url = `${environment.wc_store_api_root_url}/wc-products?filter=${JSON.stringify(filter)}`
    return this.http.get<WcProduct[]>(url).pipe(
      map((res: WcProduct[]) => {
        // console.log(res);
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }

  

  isNew(item: WcProduct | Store) {
    const dateCreated = (item as any)?.dateCreated??(item as any)?.date_created;

    if (dateCreated) {
      const days = UtilityService.calcDatesDiffInDays(dateCreated, new Date(Date.now()));
      if (days <= 14) { // after two weeks
        return true;
      }
    }
    return false;
  }


  // returns rating in %
  getProductRating(product: WcProduct) {
    // console.log(product.average_rating);
    return product.average_rating*20;
  }

  static getStoreRating(store: Store) {
    // likes
    // reviews
    //
    return 50;
  }


  /////////////////////////////////////////////////////////////////////////
  /*************WcProduct access endpoints*****/
  ///////////////////////////////////////////////////////////////////////////

  getProductCategories() {
    const filter: WcRequestFilter = {
      
    }
    const url = `${environment.wc_store_api_root_url}/products/categories?filter=${JSON.stringify(filter)}`
    return this.http.get<WcProductCategory[]>(url).pipe(
      map((res: WcProductCategory[]) => {
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }


  getProductCategoryItems() {
    const filter = {
      include: [
        {
          relation: 'photo'
        }
      ]
    }
    const url = `${environment.wc_store_api_root_url}/product-category-items?filter=${JSON.stringify(filter)}`
    return this.http.get<ProductCategoryItem[]>(url).pipe(
      map((res: ProductCategoryItem[]) => {
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }

  
  getCategoryItemsByProduct(productId: any) {
    if (!productId) {
      console.log('Invalid product id');
      return undefined;
    }
    const url = `${environment.wc_store_api_root_url}/products/${productId}/product-category-items`
    return this.http.get<ProductCategoryItem[]>(url).pipe(
      map((res: ProductCategoryItem[]) => {
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }

  getProductById(productId: any) {
    if (!productId) {
      console.log('Invalid product id');
      return undefined;
    }
    const filter = {
    }
    const url = `${environment.wc_store_api_root_url}/wc-products/${productId}?filter=${JSON.stringify(filter)}`
    return this.http.get<WcProduct>(url).pipe(
      map((res: WcProduct) => {
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }


  getFeatures() {
    const url = `${environment.wc_store_api_root_url}/features`
    return this.http.get<Features[]>(url).pipe(
      map((res: Features[]) => {
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }

  getProductFeatures(productId: any) {
    if (!productId) {
      console.log('Please select product')
      return undefined;
    }
    const url = `${environment.wc_store_api_root_url}/products/${productId}/features`
    return this.http.get<Features[]>(url).pipe(
      map((res: Features[]) => {
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }

 
  getProductCategoryItemFeatures(categoryItemId: any) {
    if (!categoryItemId) {
      console.log('Please select product category item')
      return undefined;
    }
    const url = `${environment.wc_store_api_root_url}/product-category-items/${categoryItemId}/features`
    return this.http.get<Features[]>(url).pipe(
      map((res: Features[]) => {
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }
  

  getProductsByStore(storeId: string, pageInfo?: PageInfo): Observable<any> {
    let filter;
    if (pageInfo) {
      filter = {
        // order: 'id DESC',
        limit: pageInfo.limit,
        skip: pageInfo.offset,
        where: {
          showOnPage: true
        },
        include: [
          { relation: 'features' },
          { relation: 'productCategoryItems' },
          { relation: 'shippings' },
          { relation: 'photos' },
          { relation: 'videos' },
          { relation: 'productModel' },
          { relation: 'likes' },
          { relation: 'reviews' },
          { relation: 'bargains' }
        ]
      };
    }
    filter = filter ? '?filter=' + JSON.stringify(filter) : '';
    const url = environment.wc_store_api_root_url + `/stores/${storeId}/products${filter}`;
    // console.log(url);
    return this.http.get<WcProduct[]>(url).pipe(
      map((res: WcProduct[]) => {
        // console.log(res);
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }



  searchProduct(searchKey = 'all', filter?: WcRequestFilter) {
    
    if (!searchKey) {
      searchKey = 'all';
    }
    const url = environment.wc_store_api_root_url + '/wc-products/search/' + searchKey + '?filter=' + JSON.stringify(filter) ?? '';
    // console.log(url);
    return this.http.get<Store[]>(url).pipe(
      map(res => {
        // console.log(res);
        return res as any;
      }),
      catchError(e => this.handleError(e))
    );
  }


  getPopularProducts(): Observable<any> {
    let filter: any = {
      order: 'viewCount DESC',
      limit: 15,
      skip: 0,
      where: {
        showOnPage: true
      },
      include: [
        { relation: 'features' },
        { relation: 'productCategoryItems' },
        { relation: 'shippings' },
        { relation: 'photos' },
        { relation: 'videos' },
        { relation: 'productModel' },
        { relation: 'likes' },
        { relation: 'reviews' },
        { relation: 'bargains' }
      ]
    };

    filter = filter ? '?filter=' + JSON.stringify(filter) : '';
    const url = environment.wc_store_api_root_url + `/products${filter}`;
    // console.log(url);
    return this.http.get<WcProduct[]>(url).pipe(
      map((res: WcProduct[]) => {
        // console.log(res);
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }



  /////////////////////////////////////////////////////////////////////////
  /*************Products shipping*****/
  ///////////////////////////////////////////////////////////////////////////
  createProductShipping(productId: any, shipping: Shipping) {
    if (shipping.id) { // perform update
      return this.http.patch<Shipping>(environment.wc_store_api_root_url + `/products/${productId}/shippings`, shipping).pipe(
        map(res => {
          return shipping as any;
        }),
        catchError(e => this.handleError(e))
      );
    } else {
      return this.http.post<Shipping>(environment.wc_store_api_root_url + `/products/${productId}/shippings`, shipping).pipe(
        map(res => {
          return res as any;
        }),
        catchError(e => this.handleError(e))
      );
    }
  }

  getProductShippings(productId: any) {
    if (!productId) {
      console.log('Please select product')
      return undefined;
    }
    const url = `${environment.wc_store_api_root_url}/products/${productId}/shippings`
    return this.http.get<ProductShippingClass[]>(url).pipe(
      map((res: ProductShippingClass[]) => {
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }

  deleteProductShipping(productId: string, shippingId: string) {
    if (!productId || !shippingId) {
      console.log('WcProduct id or shipping id is invalid');
      return undefined;
    }
    let filter: any = {
      id: shippingId
    }
    filter = '?where=' + JSON.stringify(filter);
    const url = `${environment.wc_store_api_root_url}/products/${productId}/shippings${filter}`
    console.log(url);
    return this.http.delete(url).pipe(
      map(res => {
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }



  /////////////////////////////////////////////////////////////////////////
  /*************Products shipping*****/
  ///////////////////////////////////////////////////////////////////////////


  // link user to product
  addProductToWhishlist(productId: any, userId: any) {
    return this.http.post<Favourite>(environment.wc_store_api_root_url + `/favourites`, { userId, productId }).pipe(
      map(res => {
        return res as any;
      }),
      catchError(e => this.handleError(e))
    );
  }

  // remove link between user to product
  removeProductFromWishList(productId: string, userId: string) {
    if (!productId || !userId) {
      console.log('Invalid product or user id.');
      return undefined;
    }
    // let filter: any = {
    //   userId,
    //   productId
    // }
    // filter = '?where=' + JSON.stringify(filter);
    const url = `${environment.wc_store_api_root_url}/favourites/deleteFroWishList/${userId}/${productId}`
    console.log(url);
    return this.http.delete(url).pipe(
      map(res => {
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }


  getUserWishList(userId: any) {
    if (!userId) {
      console.log('Please select user')
      return undefined;
    }
    const filter = {
      include: [
        { relation: 'features' },
        { relation: 'productCategoryItems' },
        { relation: 'shippings' },
        {
          relation: 'photos',
          scope: {
            include: [{
              relation: 'photoDisplayType'
            }]
          }
        },
        { relation: 'videos' },
        { relation: 'productModel' },
        { relation: 'likes' },
        { relation: 'reviews' },
        { relation: 'bargains' }
      ]
    };
    const url = `${environment.wc_store_api_root_url}/users/${userId}/products?filter=${JSON.stringify(filter)}`
    return this.http.get<WcProduct[]>(url).pipe(
      map((res: WcProduct[]) => {
        this.setWishListLocal(res);
        console.log(res);
        this.signal.sendAction(MY_ACTION.wish_list_changed)
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }



  /////////////////////////////////////////////////////////////////////////
  /******************OTHER QUERIES ***************************************/
  /////////////////////////////////////////////////////////////////////////

  searchAll(searchKey = 'all', pageInfo?: PageInfo) {
    let filter = {
      where: {
        // showOnPage: true
      }
    } as any;
    if (pageInfo) {
      filter = {
        // order: 'id DESC',
        limit: pageInfo.limit,
        skip: pageInfo.offset,
        where: {
          // showOnPage: true
        },
      };
    }

    filter = filter ? '?filter=' + JSON.stringify(filter) : '';
    console.log(filter);
    const url = environment.wc_store_api_root_url + '/search/' + searchKey + filter;
    // console.log(url);
    return this.http.get<any[]>(url).pipe(
      map(res => {
        console.log(res);
        return res as any;
      }),
      catchError(e => this.handleError(e))
    );
  }

  

  createReview(review: WcProductReview) {
    console.log(`${environment.wc_store_api_root_url}/reviews`);
    return this.http.post<WcProductReview>(`${environment.wc_store_api_root_url}/reviews`, review).pipe(
      map(res => {
        return res as any;
      }),
      catchError(e => this.handleError(e))
    );
  }

  getProductReviews(productId: any) {
    const filter = {
    };
    const url = environment.wc_store_api_root_url + `/wc-products/${productId}/reviews`;
    return this.http.get<WcProductReview[]>(url).pipe(
      map(res => {
        // console.log(res);
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }

  getLinkedProduct(productId: any){
    const filter = {
    };
    const url = environment.wc_store_api_root_url + `/wc-products/${productId}/upsell`;
    return this.http.get<WcProduct[]>(url).pipe(
      map(res => {
        // console.log(res);
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }


  /////////////////////////////////////////////////////////////////////////
  /*************Local product access*****/
  ///////////////////////////////////////////////////////////////////////////

  async getSelectedProductLocal(): Promise<WcProduct> {
    return await this.fstore.getObject('selected_product');
  }
  getSelectedProductLocalSync(): WcProduct {
    return this.fstore.getObjectSync('selected_product');
  }
  async setSelectedProductLocal(product: WcProduct) {
    return await this.fstore.setObject('selected_product', product);
  }
  removeSelectedProductLocal() {
    this.fstore.remove('selected_product');
  }

  async getProductsLocal(): Promise<WcProduct[]> {
    return await this.fstore.getObject('products');
  }
  getProductsLocalSync(): WcProduct[] {
    return this.fstore.getObjectSync('products');
  }
  async setProductsLocal(products: WcProduct[]) {
    return await this.fstore.setObject('products', products);
  }
  deleteProductsLocal() {
    this.fstore.remove('products');
  }

  getStoreCategoriesLocalSync(): WcProduct[] {
    return this.fstore.getObjectSync('store_categories');
  }
  async setStoreCategoriesLocal(cats: StoreCategory[]) {
    return await this.fstore.setObject('store_categories', cats);
  }
  deleteStoreCategoriesLocal() {
    this.fstore.remove('store_categories');
  }


  // *******************WHISH LIST******************
  getWishListLocalSync(): WcProduct[] {
    return this.fstore.getObjectSync('wish_list');
  }

  async setWishListLocal(products: WcProduct[]) {
    return this.fstore.setObjectSync('wish_list', products);
  }

  //********* */


  getCurrency(): string {
    return 'USD'
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
