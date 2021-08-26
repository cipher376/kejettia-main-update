import { UtilityService } from 'src/app/shared/services';
import { Review } from './../../models/review';
import { NO_IMAGE } from 'src/app/config';
import { ProductCategory, ProductCategoryItem, ProductModel, ProductBrand, Product, ProductToCategoryItemThrough } from './../../models/product';
import { HttpClient } from '@angular/common/http';
import { PolicyType } from './../../models/store-policy';
import { Injectable } from '@angular/core';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, map, filter } from 'rxjs/operators';
import { MyLocalStorageService } from './local-storage.service';
import { SignalService } from './signal.service';
import { environment } from 'src/environments/environment';
import { Address, Features, PolicyStatement, Store, StoreCategory, Shipping, StoreToCategoryThrough, Photo } from 'src/app/models';
import { PageInfo } from 'src/app/models/page';


export interface StoreView {
  id: string;
  addressId: string;
  name: string;
  type: string;
  url: string;
  country: string;
  state: string;
  city: string;
  suburb: string;
  street: string;
  createdOn: Date;
  modifiedOn: Date;
}

export interface StoreType {
  id: number;
  name: string;
}
// export const STORE_TYPES: StoreType[] = [
//   { id: 1, name: 'Supermarkets' },
//   { id: 2, name: 'Department Stores' },
//   { id: 3, name: 'Mall' },
//   { id: 4, name: 'Discount Retailer' },
//   { id: 5, name: 'Convenience Store' },
//   { id: 6, name: 'Warehouse' },
//   { id: 7, name: 'Whole sale' },
//   { id: 8, name: 'Drug Store' },
//   { id: 9, name: 'Used Goods Store' },
//   { id: 10, name: 'Electronic shop' },
//   { id: 11, name: 'Garage' },
//   { id: 12, name: 'Tools shop' },
//   { id: 13, name: 'Construction material shop' },
//   { id: 14, name: 'Clothings store' },
//   { id: 15, name: 'Footwear shop' },
//   { id: 16, name: 'Food store' },
//   { id: 17, name: 'Food store' },
//   { id: 18, name: 'Hospital equipment shop' },
//   { id: 19, name: 'Heavy duty equipment' }
// ];

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  ONE_MONTH = 30 * 24 * 60 * 60 * 1000; // 1 month in millisecons


  constructor(
    private fstore: MyLocalStorageService,
    private http: HttpClient
  ) {

  }


  static isNew(item: Product | Store) {
    if (item.dateCreated) {
      const days = UtilityService.calcDatesDiffInDays(item.dateCreated, new Date(Date.now()));
      if (days <= 14) { // after two weeks
        return true;
      }
    }
    return false;
  }


  // returns rating in %
  static getProductRating(product: Product) {
    // likes
    // reviews
    //
    let totalRatings = 0;
    const reviews = product?.reviews;
    if (reviews) {
      reviews.forEach(rev => {
        totalRatings += rev.rate;
      });
      return ((totalRatings / reviews?.length) / 5) * 100;
    }
    return 0;
  }

  static getStoreRating(store: Store) {
    // likes
    // reviews
    //
    return 5;
  }

  static getPhotoUrlByDisplayTypeLocal(photos: Photo[], displayType: string, thumb = false, chooseAny = false,) {
    let url = '';
    let foundPhotos: Photo[] = [];
    photos?.forEach(photo => {
      if (photo.photoDisplayType?.type?.toLowerCase() == displayType) {
        foundPhotos.push(photo);
      }
    })

    if ((foundPhotos?.length > 0)) {
      const tmp = foundPhotos[Math.floor(Math.random() * (foundPhotos?.length))]
      url = environment.file_api_download_url_root + (thumb ? tmp.thumbnail : tmp.source);
    }
    if (chooseAny && (foundPhotos?.length <= 0) && (photos?.length > 0)) {
      const tmp = photos[Math.floor(Math.random() * (foundPhotos?.length))]
      url = environment.file_api_download_url_root + (thumb ? tmp.thumbnail : tmp.source);
    }

    if (!url) {
      return NO_IMAGE;
    }

    return url;
  }




  createStorePolicyType(policyType: PolicyType) {
    console.log(policyType);
    const url = `${environment.store_api_root_url}/stores/policy-types`
    return this.http.post<PolicyType>(url, policyType).pipe(
      map(res => {
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }

  deleteStorePolicyType(policyTypeId: string) {
    if (!policyTypeId) {
      console.log('Policy type ID cannot be undefined');
      return undefined;
    }
    const url = `${environment.store_api_root_url}/stores/policy-types/${policyTypeId}`
    return this.http.delete(url).pipe(
      map(res => {
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }

  getStorePolicyTypes() {
    const url = `${environment.store_api_root_url}/stores/policy-types`
    return this.http.get<PolicyType[]>(url).pipe(
      map(res => {
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }

  createUpdateAddress(storeId: any, address: Address) {
    if (address.id) { // perform update
      return this.http.patch<Address>(environment.store_api_root_url + `/stores/${storeId}/address`, address).pipe(
        map(res => {
          // console.log(res);
          return address as any;
        }),
        catchError(e => this.handleError(e))
      );
    } else {
      return this.http.post<Address>(environment.store_api_root_url + `/stores/${storeId}/address`, address).pipe(
        map(res => {
          // console.log(res);
          return res as any;
        }),
        catchError(e => this.handleError(e))
      );
    }
  }







  /////////////////////////////////////////////////////////////////////////
  /*************Store endpoints*****/
  ///////////////////////////////////////////////////////////////////////////



  createUpdateStore(store: Store) {
    if (!store?.createdById) {
      console.log('Created by Id should be set');
      return undefined;
    }
    if (store.id) { // perform update
      return this.http.patch<Store>(environment.store_api_root_url + `/stores/${store?.id}`, store).pipe(
        map(res => {
          // console.log(res);
          return store as any;
        }),
        catchError(e => this.handleError(e))
      );
    } else {
      return this.http.post<Store>(environment.store_api_root_url + `/stores`, store).pipe(
        map(res => {
          // console.log(res);
          return res as any;
        }),
        catchError(e => this.handleError(e))
      );
    }
  }


  searchStore(searchKey = 'all', pageInfo?: PageInfo) {
    let filter = {};
    if (pageInfo) {
      filter = {
        // offset: pageInfo.offset,
        limit: pageInfo.limit,
        skip: pageInfo.offset,
        include: [
          {
            relation: 'address'
          },
          {
            // relation: 'storeCategories'
          }
        ]
      };
    }
    if (!searchKey) {
      searchKey = 'all';
    }
    const url = environment.store_api_root_url + '/stores-search/' + searchKey + '?filter=' + JSON.stringify(filter) ?? '';
    // console.log(url);
    return this.http.get<Store[]>(url).pipe(
      map(res => {
        // console.log(res);
        return res as any;
      }),
      catchError(e => this.handleError(e))
    );
  }


  getStoreById(storeId: string): Observable<any> {
    let filter;
    filter = {
      include: [
        { relation: 'address' },
        { relation: 'policyStatements' },
        { relation: 'coupons' },
        {
          relation: 'photos',
          scope: {
            include: [{
              relation: 'photoDisplayType'
            }]
          }
        },
        { relation: 'videos' },
        { relation: 'reviews' },
        { relation: 'likes' },
        {
          relation: 'storeCategories',
          scope: {
            include: [
              {
                relation: 'photo'
              },
              {
                relation: 'productCategories',
                scope: {
                  include: [
                    {
                      relation: 'productCategoryItems',
                      scope: {
                        include: [
                          {
                            relation: 'photo'
                          }
                        ]
                      }
                    },
                    {
                      relation: 'photo'
                    },
                  ]
                }
              }
            ]
          }
        },
        {
          relation: 'favouriteUsers'
        },
        {
          relation: 'products',
          scope: {
            include: [
              {
                relation: 'productModel',
                scope: {
                  include: [
                    {
                      relation: 'productBrand',
                      scope: {
                        include: ['photo']
                      }
                    }
                  ]
                }
              },
              {
                relation: 'photos'
              }
            ]
          }
        },

      ]
    };
    filter = filter ? '?filter=' + JSON.stringify(filter) : '';
    const url = environment.store_api_root_url + `/stores/${storeId}` + filter;
    // console.log(url);
    return this.http.get<Store>(url).pipe(
      map((res: Store) => {
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }

  getPremiumStores(): Observable<any> {
    let filter;
    filter = {
      where: {
        // isPremium: true,
        // showOnHomePage: true
      },
      include: [
        { relation: 'address' },
        { relation: 'policyStatements' },
        { relation: 'coupons' },
        {
          relation: 'photos',
          scope: {
            include: [{
              relation: 'photoDisplayType'
            }]
          }
        },
        { relation: 'videos' },
        { relation: 'reviews' },
        { relation: 'likes' },
        {
          relation: 'storeCategories',
          scope: {
            include: [
              {
                relation: 'photo'
              },
              {
                relation: 'productCategories',
                scope: {
                  include: [
                    {
                      relation: 'productCategoryItems',
                      scope: {
                        include: [
                          {
                            relation: 'photo'
                          }
                        ]
                      }
                    },
                    {
                      relation: 'photo'
                    },
                  ]
                }
              }
            ]
          }
        },
        {
          relation: 'favouriteUsers'
        },
        {
          relation: 'products',
          scope: {
            include: [
              {
                relation: 'productModel',
                scope: {
                  include: [
                    {
                      relation: 'productBrand',
                      scope: {
                        include: ['photo']
                      }
                    }
                  ]
                }
              }
            ]
          }
        },

      ]
    };
    filter = filter ? '?filter=' + JSON.stringify(filter) : '';
    const url = environment.store_api_root_url + `/stores` + filter;
    return this.http.get<Store[]>(url).pipe(
      map((res: Store[]) => {
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }


  getStores(pageInfo?: PageInfo): Observable<any> {
    let filter;
    if (pageInfo) {
      filter = {
        // order: 'id DESC',
        limit: pageInfo.limit,
        skip: pageInfo.offset,
        include: [
          { relation: 'address' },
          {
            relation: 'photos',
            scope: {
              include: [{
                relation: 'photoDisplayType'
              }]
            }
          },
        ]
      };
    }
    filter = filter ? '?filter=' + JSON.stringify(filter) : '';
    const url = environment.store_api_root_url + '/stores' + filter;
    // console.log(url);
    return this.http.get<Store[]>(url).pipe(
      map((res: Store[]) => {
        // console.log(res);
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }

  getAllStores(pageInfo?: PageInfo): Observable<any> {
    let filter = {} as any;
    if (pageInfo) {
      filter = {
        // order: 'id DESC',
        fields: ['id', 'name'],
        limit: pageInfo.limit,
        skip: pageInfo.offset,

      };
    }
    filter.include = [
      { relation: 'address' },
      {
        relation: 'photos',
        scope: {
          include: [{
            relation: 'photoDisplayType'
          }]
        }
      },
    ]
    filter = filter ? '?filter=' + JSON.stringify(filter) : '';
    const url = environment.store_api_root_url + '/stores' + filter;
    // console.log(url);
    return this.http.get<Store[]>(url).pipe(
      map((res: Store[]) => {
        // console.log(res);
        this.setStoresLocal(res);
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }

  deleteStore(storeId: string) {
    if (!storeId) {
      console.log('Store ID cannot be undefined');
      return undefined;
    }
    const url = `${environment.store_api_root_url}/stores/${storeId}`
    return this.http.delete(url).pipe(
      map(res => {
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }








  /////////////////////////////////////////////////////////////////////////
  /*************Store categories endpoints*****/
  ///////////////////////////////////////////////////////////////////////////



  createStoreCategory(category: StoreCategory) {
    const url = `${environment.store_api_root_url}/store-categories`
    return this.http.post<StoreCategory>(url, category).pipe(
      map(res => {
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }


  getStoreCategories() {
    const filter = {
      include: [
        {
          relation: 'photo'
        },
        {
          relation: 'productCategories',
          scope: {
            include: [
              {
                relation: 'productCategoryItems',
                scope: {
                  include: [
                    {
                      relation: 'photo'
                    }
                  ]
                }
              },
              {
                relation: 'photo'
              },
            ]
          }
        }
      ]
    }
    const url = `${environment.store_api_root_url}/store-categories?filter=${JSON.stringify(filter)}`
    return this.http.get<StoreCategory[]>(url).pipe(
      map((res: StoreCategory[]) => {
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }

  deleteStoreCategory(categoryId: string) {
    if (!categoryId) {
      console.log('Policy type ID cannot be undefined');
      return undefined;
    }
    const url = `${environment.store_api_root_url}/store-categories/${categoryId}`
    return this.http.delete(url).pipe(
      map(res => {
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }

  getCategoriesByStore(storeId: any) {
    if (!storeId) {
      console.log('Invalid store id');
      return undefined;
    }
    const filter = {
      include: [
        {
          relation: 'photo'
        },
        {
          relation: 'productCategories',
          scope: {
            include: [
              {
                relation: 'productCategoryItems',
                scope: {
                  include: [
                    {
                      relation: 'photo'
                    }
                  ]
                }
              },
              {
                relation: 'photo'
              },
            ]
          }
        }
      ]
    }
    const url = `${environment.store_api_root_url}/stores/${storeId}/store-categories?filter=${JSON.stringify(filter)}`
    return this.http.get<StoreCategory[]>(url).pipe(
      map((res: StoreCategory[]) => {
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }



  // linking store to Category item
  addStoreToCategory(storeId: any, storeCategoryId: any) {
    if (!storeId || !storeCategoryId) {
      console.log('Invalid store to category items map ids');
      return undefined;
    }
    const throughItem = { storeId, storeCategoryId } as ProductToCategoryItemThrough;

    const url = `${environment.store_api_root_url}/store-to-category-throughs`
    return this.http.post<StoreToCategoryThrough>(url, throughItem).pipe(
      map(res => {
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }

  deleteStoreFromCategories(storeId: any, categoryId: any) {
    if (!storeId || !categoryId) {
      console.log('Invalid store to category items map ids');
      return undefined;
    }
    let filter: any = {
      storeId, categoryId
    }
    filter = '?where=' + JSON.stringify(filter);
    const url = `${environment.store_api_root_url}/store-to-category-throughs${filter}`
    return this.http.delete(url).pipe(
      map(res => {
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }


  /////////////////////////////////////////////////////////////////////////
  /*************Product access endpoints*****/
  ///////////////////////////////////////////////////////////////////////////

  createProductCategory(storeCategoryId: string, category: ProductCategory) {
    if (!storeCategoryId) {
      return undefined;
    }
    const url = `${environment.store_api_root_url}/store-categories/${storeCategoryId}/product-categories`
    return this.http.post<ProductCategory>(url, category).pipe(
      map(res => {
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }


  getProductCategories() {
    const filter = {
      include: [
        {
          relation: 'photo'
        }
      ]
    }
    const url = `${environment.store_api_root_url}/product-categories?filter=${JSON.stringify(filter)}`
    return this.http.get<ProductCategory[]>(url).pipe(
      map((res: ProductCategory[]) => {
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }

  deleteProductCategory(categoryId: string) {
    if (!categoryId) {
      console.log('Product category ID cannot be undefined');
      return undefined;
    }
    const url = `${environment.store_api_root_url}/product-categories/${categoryId}`
    return this.http.delete(url).pipe(
      map(res => {
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }


  createProductCategoryItem(productCategoryId: string, item: ProductCategoryItem) {
    if (!productCategoryId) {
      return undefined;
    }

    const url = `${environment.store_api_root_url}/product-categories/${productCategoryId}/product-category-items`
    return this.http.post<ProductCategoryItem>(url, item).pipe(
      map(res => {
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
    const url = `${environment.store_api_root_url}/product-category-items?filter=${JSON.stringify(filter)}`
    return this.http.get<ProductCategoryItem[]>(url).pipe(
      map((res: ProductCategoryItem[]) => {
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }

  deleteProductCategoryItem(itemId: string) {
    if (!itemId) {
      console.log('Product category item ID cannot be undefined');
      return undefined;
    }
    const url = `${environment.store_api_root_url}/product-category-items/${itemId}`
    return this.http.delete(url).pipe(
      map(res => {
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }

  // linking product to Category item
  addProductToCategoryItem(productId: any, categoryItemId: any) {
    if (!productId || !categoryItemId) {
      console.log('Invalid product to category items map ids');
      return undefined;
    }
    const throughItem = { productId, productCategoryItemId: categoryItemId } as ProductToCategoryItemThrough;

    const url = `${environment.store_api_root_url}/product-to-category-item-throughs`
    return this.http.post<ProductToCategoryItemThrough>(url, throughItem).pipe(
      map(res => {
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }

  // delete link not actual items
  deleteProductFromCategoryItem(productId: any, productCategoryItemId: any) {
    if (!productId || !productCategoryItemId) {
      console.log('Invalid product to category items map ids');
      return undefined;
    }
    let filter: any = {
      productId, productCategoryItemId
    }
    filter = '?where=' + JSON.stringify(filter);
    const url = `${environment.store_api_root_url}/product-to-category-item-throughs${filter}`
    return this.http.delete(url).pipe(
      map(res => {
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
    const url = `${environment.store_api_root_url}/products/${productId}/product-category-items`
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
    }
    const url = `${environment.store_api_root_url}/products/${productId}?filter=${JSON.stringify(filter)}`
    return this.http.get<Product>(url).pipe(
      map((res: Product) => {
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }

  /////////////////////////////////////////////////////////////////////////
  /*************Features access endpoints*****/
  ///////////////////////////////////////////////////////////////////////////

  createProductFeatures(productId: any, features: Features) {
    if (!productId) {
      console.log('Please select product')
      return undefined;
    }
    const url = `${environment.store_api_root_url}/products/${productId}/features`
    return this.http.post<Features>(url, features).pipe(
      map(res => {
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }

  createStoreFeatures(storeId: any, features: Features) {
    if (!storeId) {
      console.log('Please select store')
      return undefined;
    }
    const url = `${environment.store_api_root_url}/stores/${storeId}/features`
    return this.http.post<Features>(url, features).pipe(
      map(res => {
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }


  createProductCategoryItemFeatures(categoryItemId: any, features: Features) {
    if (!categoryItemId) {
      console.log('Please select product category item')
      return undefined;
    }
    const url = `${environment.store_api_root_url}/product-category-items/${encodeURIComponent(categoryItemId)}/features`
    console.log(url);
    return this.http.post<Features>(url, features).pipe(
      map(res => {
        console.log(res);
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }


  getFeatures() {
    const url = `${environment.store_api_root_url}/features`
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
    const url = `${environment.store_api_root_url}/products/${productId}/features`
    return this.http.get<Features[]>(url).pipe(
      map((res: Features[]) => {
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }

  getStoreFeatures(storeId: any) {
    if (!storeId) {
      console.log('Please select store')
      return undefined;
    }
    const url = `${environment.store_api_root_url}/stores/${storeId}/features`
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
    const url = `${environment.store_api_root_url}/product-category-items/${categoryItemId}/features`
    return this.http.get<Features[]>(url).pipe(
      map((res: Features[]) => {
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }

  deleteFeature(featureId: string) {
    if (!featureId) {
      console.log('Feature ID cannot be undefined');
      return undefined;
    }
    const url = `${environment.store_api_root_url}/features/${featureId}`
    return this.http.delete(url).pipe(
      map(res => {
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }

  /////////////////////////////////////////////////////////////////////////
  /*************Product Model ********/
  ///////////////////////////////////////////////////////////////////////////
  createProductModel(productBrandId: string, model: ProductModel) {
    if (!productBrandId) {
      console.log('Product brand ID cannot be undefined');
      return undefined;
    }
    if (model.id) { // perform update
      return this.http.patch<Address>(environment.store_api_root_url + `/product-models/${model?.id}`, model).pipe(
        map(res => {
          // console.log(res);
          return model as any;
        }),
        catchError(e => this.handleError(e))
      );
    } else {
      const url = `${environment.store_api_root_url}/product-brands/${productBrandId}/product-models`
      return this.http.post<ProductModel>(url, model).pipe(
        map(res => {
          return res;
        }),
        catchError(e => this.handleError(e))
      );
    }
  }


  getProductModel(productId: any) {
    let filter: any = {
      include: [
        {
          relation: 'productBrand'
        }
      ]
    };

    filter = filter ? '?filter=' + JSON.stringify(filter) : '';
    const url = `${environment.store_api_root_url}/products/${productId}/product-model${filter}`
    console.log(url);
    return this.http.get<ProductModel>(url).pipe(
      map((res: ProductModel) => {
        console.log(res);
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }


  deleteProductModel(productId: string) {
    if (!productId) {
      console.log('Product model ID cannot be undefined');
      return undefined;
    }
    const url = `${environment.store_api_root_url}/products/${productId}/product-model`
    return this.http.delete(url).pipe(
      map(res => {
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }


  // deleteProductModel(modelId: string) {
  //   if (!modelId) {
  //     console.log('Product model ID cannot be undefined');
  //     return undefined;
  //   }
  //   const url = `${environment.store_api_root_url}/product-models/${modelId}`
  //   return this.http.delete(url).pipe(
  //     map(res => {
  //       return res;
  //     }),
  //     catchError(e => this.handleError(e))
  //   );
  // }


  /////////////////////////////////////////////////////////////////////////
  /*************Product Brand ********/
  ///////////////////////////////////////////////////////////////////////////
  createProductBrand(brand: ProductBrand) {
    const url = `${environment.store_api_root_url}/product-brands`
    return this.http.post<ProductBrand>(url, brand).pipe(
      map(res => {
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }


  getProductBrands() {
    const filter = {
      include: [
        {
          relation: 'photo'
        }
      ]
    }
    const url = `${environment.store_api_root_url}/product-brands?filter=${JSON.stringify(filter)}`
    return this.http.get<ProductBrand[]>(url).pipe(
      map((res: ProductBrand[]) => {
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }

  deleteProductBrand(brandId: string) {
    if (!brandId) {
      console.log('Product brand ID cannot be undefined');
      return undefined;
    }
    const url = `${environment.store_api_root_url}/product-brands/${brandId}`
    return this.http.delete(url).pipe(
      map(res => {
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }
  /////////////////////////////////////////////////////////////////////////
  /*************Store policy statement*****/
  ///////////////////////////////////////////////////////////////////////////


  createStorePolicyStatement(storeId: any, policy: PolicyStatement) {
    if (policy.id) { // perform update
      return this.http.patch<PolicyStatement>(environment.store_api_root_url + `/stores/${storeId}/policy-statements`, policy).pipe(
        map(res => {
          return policy as any;
        }),
        catchError(e => this.handleError(e))
      );
    } else {
      return this.http.post<PolicyStatement>(environment.store_api_root_url + `/stores/${storeId}/policy-statements`, policy).pipe(
        map(res => {
          return res as any;
        }),
        catchError(e => this.handleError(e))
      );
    }
  }

  deleteStorePolicyStatement(storeId: string, policyId: string) {
    if (!storeId || !policyId) {
      console.log('Store id or policy id is invalid');
      return undefined;
    }
    let filter: any = {
      id: policyId
    }
    filter = '?where=' + JSON.stringify(filter);
    const url = `${environment.store_api_root_url}/stores/${storeId}/policy-statements${filter}`
    console.log(url);
    return this.http.delete(url).pipe(
      map(res => {
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }

  deletePolicyStatement(policyStatementId: string) {
    if (!policyStatementId) {
      console.log('Invalid policy statement ID')
      return undefined;
    }
    const url = `${environment.store_api_root_url}/policy-statements/${policyStatementId}`
    return this.http.delete(url).pipe(
      map(res => {
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }

  getPolicyStatementsByStore(storeId: string) {
    if (!storeId) {
      console.log('Please select store')
      return undefined;
    }
    const url = `${environment.store_api_root_url}/stores/${storeId}/policy-statements`
    return this.http.get<PolicyStatement[]>(url).pipe(
      map((res: PolicyStatement[]) => {
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }
  /////////////////////////////////////////////////////////////////////////
  /*************Store products access*****/
  ///////////////////////////////////////////////////////////////////////////

  createUpdateProduct(storeId: string, product: Product) {
    if (product.id) { // perform update
      const where = {
        id: product.id
      }
      return this.http.patch<Product>(environment.store_api_root_url + `/stores/${storeId}/products?where=${JSON.stringify(where)}`, product).pipe(
        map(res => {
          return product as any;
        }),
        catchError(e => this.handleError(e))
      );
    } else {
      return this.http.post<Product>(environment.store_api_root_url + `/stores/${storeId}/products`, product).pipe(
        map(res => {
          return res as any;
        }),
        catchError(e => this.handleError(e))
      );
    }
  }

  getProductsByStore(storeId: string, pageInfo?: PageInfo): Observable<any> {
    let filter;
    if (pageInfo) {
      filter = {
        // order: 'id DESC',
        limit: pageInfo.limit,
        skip: pageInfo.offset,
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
    const url = environment.store_api_root_url + `/stores/${storeId}/products${filter}`;
    // console.log(url);
    return this.http.get<Product[]>(url).pipe(
      map((res: Product[]) => {
        // console.log(res);
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }


  deleteProductByStore(productId: string, storeId: string) {
    if (!productId || !storeId) {
      console.log('Invalid args for deleteProductByStore')
      return undefined;
    }
    const where = '?where=' + JSON.stringify({ id: productId })
    const url = `${environment.store_api_root_url}/stores/${storeId}/products${where}`
    return this.http.delete(url).pipe(
      map(res => {
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }

  searchProduct(searchKey = 'all', pageInfo?: PageInfo) {
    let filter = {};
    if (pageInfo) {
      filter = {
        // offset: pageInfo.offset,
        limit: pageInfo.limit,
        skip: pageInfo.offset,
        include: [
          {
            relation: 'productCategoryItem'
          },
          {
            relation: 'photos'
          },
          {
            relation: 'videos'
          },
          {
            relation: 'productModel'
          }
        ]
      };
    }
    if (!searchKey) {
      searchKey = 'all';
    }
    const url = environment.store_api_root_url + '/products-search/' + searchKey + '?filter=' + JSON.stringify(filter) ?? '';
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
    const url = environment.store_api_root_url + `/products${filter}`;
    // console.log(url);
    return this.http.get<Product[]>(url).pipe(
      map((res: Product[]) => {
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
      return this.http.patch<Shipping>(environment.store_api_root_url + `/products/${productId}/shippings`, shipping).pipe(
        map(res => {
          return shipping as any;
        }),
        catchError(e => this.handleError(e))
      );
    } else {
      return this.http.post<Shipping>(environment.store_api_root_url + `/products/${productId}/shippings`, shipping).pipe(
        map(res => {
          return res as any;
        }),
        catchError(e => this.handleError(e))
      );
    }
  }
  getProductShippings(productId: string) {
    if (!productId) {
      console.log('Please select product')
      return undefined;
    }
    const url = `${environment.store_api_root_url}/products/${productId}/shippings`
    return this.http.get<Shipping[]>(url).pipe(
      map((res: Shipping[]) => {
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }
  deleteProductShipping(productId: string, shippingId: string) {
    if (!productId || !shippingId) {
      console.log('Product id or shipping id is invalid');
      return undefined;
    }
    let filter: any = {
      id: shippingId
    }
    filter = '?where=' + JSON.stringify(filter);
    const url = `${environment.store_api_root_url}/products/${productId}/shippings${filter}`
    console.log(url);
    return this.http.delete(url).pipe(
      map(res => {
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }
  /////////////////////////////////////////////////////////////////////////
  /******************OTHER QUERIES ***************************************/
  /////////////////////////////////////////////////////////////////////////

  searchAll(searchKey = 'all', pageInfo?: PageInfo) {
    let filter;
    if (pageInfo) {
      filter = {
        // order: 'id DESC',
        limit: pageInfo.limit,
        skip: pageInfo.offset,
      };
    }
    filter = filter ? '?filter=' + JSON.stringify(filter) : '';
    const url = environment.store_api_root_url + '/search/' + searchKey + filter;
    // console.log(url);
    return this.http.get<any[]>(url).pipe(
      map(res => {
        // console.log(res);
        return res as any;
      }),
      catchError(e => this.handleError(e))
    );
  }

  searchCompany(searchKey = 'all', pageInfo?: PageInfo) {
    let filter;
    if (pageInfo) {
      filter = {
        // order: 'id DESC',
        limit: pageInfo.limit,
        skip: pageInfo.offset,
      };
    }
    filter = filter ? '?filter=' + JSON.stringify(filter) : '';
    const url = environment.store_api_root_url + '/search/' + searchKey + filter;
    // console.log(url);
    return this.http.get<any[]>(url).pipe(
      map(res => {
        // console.log(res);
        return res as any;
      }),
      catchError(e => this.handleError(e))
    );
  }


  createReview(review: Review) {
    console.log(`${environment.store_api_root_url}/reviews`);
    return this.http.post<Review>(`${environment.store_api_root_url}/reviews`, review).pipe(
      map(res => {
        return res as any;
      }),
      catchError(e => this.handleError(e))
    );
  }

  getProductReviews(productId: any) {
    const filter = {
    };
    const url = environment.store_api_root_url + `/products/${productId}/reviews`;
    return this.http.get<Review[]>(url).pipe(
      map(res => {
        // console.log(res);
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }


  /////////////////////////////////////////////////////////////////////////
  /*************Local store access*****/
  ///////////////////////////////////////////////////////////////////////////

  async getSelectedStoreLocal(): Promise<Store> {
    return await this.fstore.getObject('selected_store');
  }
  getSelectedStoreLocalSync(): Store {
    return this.fstore.getObjectSync('selected_store');
  }

  async setSelectedStoreLocal(store: Store) {
    return await this.fstore.setObject('selected_store', store);
  }
  removeSelectedStoreLocal() {
    this.fstore.remove('selected_store');
  }


  // *** loaded to disk for usage
  async getStoresLocal(): Promise<Store[]> {
    return await this.fstore.getObject('stores');
  }
  getStoresLocalSync(): Store[] {
    return this.fstore.getObjectSync('stores');
  }
  async setStoresLocal(stores: Store[]) {
    return await this.fstore.setObject('stores', stores);
  }
  deleteStoresLocal() {
    this.fstore.remove('stores');
  }


  //****subset of loaded stores */
  getSelectedStoresLocal() {
    return this.fstore.getObjectSync('selected_stores');
  }
  setSelectedStoresLocal(stores: Store[]) {
    this.fstore.setObjectSync('selected_stores', stores);
  }


  async getSelectedProductLocal(): Promise<Product> {
    return await this.fstore.getObject('selected_product');
  }
  getSelectedProductLocalSync(): Product {
    return this.fstore.getObjectSync('selected_product');
  }
  async setSelectedProductLocal(product: Product) {
    return await this.fstore.setObject('selected_product', product);
  }
  removeSelectedProductLocal() {
    this.fstore.remove('selected_product');
  }

  async getProductsLocal(): Promise<Product[]> {
    return await this.fstore.getObject('products');
  }
  getProductsLocalSync(): Product[] {
    return this.fstore.getObjectSync('products');
  }
  async setProductsLocal(products: Product[]) {
    return await this.fstore.setObject('products', products);
  }
  deleteProductsLocal() {
    this.fstore.remove('products');
  }

  getStoreCategoriesLocalSync(): Product[] {
    return this.fstore.getObjectSync('store_categories');
  }
  async setStoreCategoriesLocal(cats: StoreCategory[]) {
    return await this.fstore.setObject('store_categories', cats);
  }
  deleteStoreCategoriesLocal() {
    this.fstore.remove('store_categories');
  }


  //********* */




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
