import { UtilityService } from './utility.service';
import { StoreService } from './store.service';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subscriber, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Photo, ProductCategory, ProductCategoryApi, ProductItem, ProductItemApi, Store, StoreApi } from '../store-sdk';
import { Currency } from './cart.service';
import { MY_ACTION, SignalService } from './signal.service';
import { MyLocalStorageService } from './local-storage.service';
import { Product } from '../models/product.model';

export interface DataTableColumns {
  label: string;
  path: string; // property path of nested object properties
}


export enum SORT_PARAMETERS {
  LOWEST_PRICE = 1,
  HIGHEST_PRICE = 2,
  FIRST_SALES = 3,
  SPECIAL_OFFER = 4
}

// Get product from Local storage
const products = JSON.parse(localStorage.getItem('compareItem')) || [];

export type ProductColor = 'white' | 'black' | 'red' | 'green' | 'purple' | 'yellow' | 'blue' | 'gray' | 'orange' | 'pink';
export interface ColorFilter {
  color?: ProductColor;
}
export interface ProductItemView {
  id: any;
  isGift?: boolean;
  isSale?: boolean;
  isNew?: boolean;
  showDetailBtn?: boolean;
  price?: number;
  prevPrice?: number;
  salesCount?: number;
  longDesc?: string;
  currency?: Currency;
  shortDesc?: string;
  frontImage?: string;
  backImage?: string;
  anyImage?: string;
  coverImage?: string;
  photos?: Photo[];
  count?: number;
  brand?: string;
  url?: string;
  rate?: number;
  categories?: ProductCategory[];
  colors?: ProductColor[];
  // Store details
  store?: Store;
  rackId?: string;
  storeAddress?: string;
}


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public currency = 'USD';
  public catalogMode = false;

  private _url = 'assets/data/';
  public url = 'assets/data/banners.json';

  public compareProducts: BehaviorSubject<Product[]> = new BehaviorSubject([]);
  public observer: Subscriber<{}>;

  constructor(
    private httpClient: HttpClient,
    // public snackBar: MatSnackBar,
    private _storeApi: StoreApi,
    private _productApi: ProductItemApi,
    private _catApi: ProductCategoryApi,
    private _localStorage: MyLocalStorageService,
    private _signalService: SignalService,
    private _util: UtilityService,
    private storeService: StoreService) {
    this.compareProducts.subscribe(products => products = products);
  }

  private products(): Observable<Product[]> {
    return this.httpClient.get<Product[]>('assets/data/products2.json');
  }

  public banners(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.url);
  }


  // Get Banners
  public getBanners() {
    return this.banners();
  }


  // Get Products By Id
  public getProduct(id: number): Observable<Product> {
    return this.products().pipe(map(items => {
      return items.find((item: Product) => item.id === id);
    }));
    // return this.products.find(product=> product.id === id);

    // return this.httpClient.get<Product>(this._url + 'product-' + id + '.json');
  }




  /*
  ---------------------------------------------
  ----------  Compare Product  ----------------
  ---------------------------------------------
  */

  // Get Compare Products
  public getComapreProducts(): Observable<Product[]> {
    const itemsStream = new Observable(observer => {
      observer.next(products);
      observer.complete();
    });
    return itemsStream as Observable<Product[]>;
  }

  // If item is aleready added In compare
  public hasProduct(product: Product): boolean {
    const item = products.find(item => item.id === product.id);
    return item !== undefined;
  }

  // Add to compare
  public addToCompare(product: Product): Product | boolean {
    let message, status;
    let item: Product | boolean = false;
    if (this.hasProduct(product)) {
      item = products.filter(item => item.id === product.id)[0];
      const index = products.indexOf(item);
      // this.snackBar.open('The product  ' + product.name +
      //   ' already added to comparison list.', '×',
      //   { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      alert('The product  ' + product.name + ' already added to comparison list.')
    } else {
      if (products.length < 4) {
        products.push(product);
      }
      message = 'The product ' + product.name + ' has been added to comparison list.';
      status = 'success';
      // this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });
      alert(message);

    }
    localStorage.setItem('compareItem', JSON.stringify(products));
    return item;
  }

  // Removed Product
  public removeFromCompare(product: Product) {
    if (product === undefined) { return; }
    const index = products.indexOf(product);
    products.splice(index, 1);
    localStorage.setItem('compareItem', JSON.stringify(products));
  }

  // Get Products By category
  public getProductByCategory(category: string): Observable<Product[]> {
    return this.products().pipe(map(items =>
      items.filter((item: Product) => {
        if (category === 'all') {
          return item;
        } else {
          return item.category === category;
        }

      })
    ));
  }















  /**********************************************************************************
  ****************  Product Services                ********************************
  ***********************************************************************************/

  getProducts(
    skip = 0, limit = 1000, gift = false,
    salesCount = 0, priceStart = 0, priceEnd = 10000000000) {
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
          relation: 'favouriteUsers',
        },
        {
          relation: 'productCategoryItems',
          scope: [
            {
              relation: 'ProductCategory'
            }
          ]
        },
        {
          relation: 'photos'
        }
      ]
    } as any;

    console.log(filter);

    return this._productApi.find<ProductItem>(filter).pipe(
      map((res: ProductItem[]) => {
        this.saveProductsLocal(res).then(_ => _);
        return res;
      }), catchError((e) => this.handleError(e))
    );
  }

  deleteProduct(prod: ProductItem) {
    return this._productApi.deleteById(prod.id).pipe(
      map((res) => {
        return res;
      }), catchError((e) => this.handleError(e))
    );
  }

  // async getProductsByStore(storeId = null, skip = 0, limit = 1000, salesCount = 0, priceStart = 0, priceEnd = 10000000000) {
  //   if (!storeId) {
  //     storeId = await this.storeService.getStoreIdLocal();
  //   }
  //   if (!storeId) {
  //     return;
  //   }

  //   const where = {} as any;
  //   if (salesCount > 0) {
  //     where.salesCount = { gte: salesCount };
  //   }
  //   if (priceStart > 0) {
  //     where.currentPrice = { gte: priceStart };
  //   }

  //   if (priceEnd > 0) {
  //     where.currentPrice = { lte: priceEnd };
  //   }
  //   const filter = {
  //     order: 'id DESC',
  //     limit,
  //     skip,
  //     where,
  //     fields: ['id'],
  //     include: [
  //       {
  //         relation: 'productCategories',
  //         scope: {
  //           include: [
  //             {
  //               relation: 'productCategoryItems',
  //               scope: {
  //                 include: [
  //                   {
  //                     relation: 'productItem',
  //                     scope: {
  //                       include: [
  //                         {
  //                           relation: 'favouriteUsers',
  //                         },
  //                         {
  //                           relation: 'photos'
  //                         },
  //                       ]
  //                     }
  //                   }
  //                   // {
  //                   //   relation: 'productCategory',
  //                   //   scope: {
  //                   //     include: [
  //                   //       {
  //                   //         relation: 'store'
  //                   //       }
  //                   //     ]
  //                   //   }
  //                   // }
  //                 ]
  //               }
  //             }
  //           ]
  //         }
  //       }
  //     ]
  //   } as any;
  //   // console.log(filter);

  //   return this._storeApi.findById<Store>(storeId, filter).pipe(
  //     map((res: Store) => {
  //       console.log(res);
  //       const products: ProductItem[] = [];
  //       if (res && res.productCategories) {
  //         res.productCategories.forEach(cat => {
  //           cat.productCategoryItems.forEach(catItem => {
  //             // remove duplicates
  //             if (!(products.find((item) => {
  //               return item.id === catItem.productItem.id;
  //             }))) {
  //               catItem.productItem.productCategoryItems = cat.productCategoryItems;
  //               products.push(catItem.productItem);
  //               // console.log(catItem.productItem);
  //             }
  //           });
  //         });
  //       }
  //       // console.log(products);
  //       this.saveProductsLocal(products).then(_ => _);
  //       return products;
  //     }), catchError((e) => this.handleError(e))
  //   );
  // }

  getProductItemById(itemId: any) {
    const filter = {
      include: [
        {
          relation: 'favouriteUsers',
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

    return this._productApi.findById<ProductItem>(itemId, filter).pipe(
      map((res) => {
        return res;
      }), catchError((e) => this.handleError(e))
    );
  }

  getProductsByCategory(catId: string, skip = 0, limit = 1000) {
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
                      relation: 'favouriteUsers',
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
        this.saveProductsLocal(products).then(_ => _);
        return products;
      }), catchError((e) => this.handleError(e))
    );
  }
  getProductsByCategoryName(categoryName: string, storeId: any, skip = 0, limit = 1000) {
    // const where = <any>{};
    // if (storeId) {
    //   where.id = storeId;
    // }

    const filter = {
      order: 'id DESC',
      limit,
      skip,
      fields: ['id'],
      where: { name: categoryName },
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
                      relation: 'favouriteUsers',
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
    return this._catApi.findOne<ProductCategory>(filter).pipe(
      map((res: ProductCategory) => {
        console.log(res);
        const products: ProductItem[] = [];
        if (res && res.productCategoryItems) {
          res.productCategoryItems.forEach(catItem => {
            products.push(catItem.productItem);
          });
        }
        this.saveProductsLocal(products).then(_ => _);
        return products;
      }), catchError((e) => this.handleError(e))
    );
  }

  getProductById(id: any) {
    const filter = {
      include: [
        {
          relation: 'photos',
        },
        {
          relation: 'favouriteUsers'
        },
        {
          relation: 'productCategoryItems',
          scope: {
            include: {
              relation: 'productCategory',
              scope: {
                relation: 'store'
              }
            }
          }
        }
      ]
    } as any;
    return this._productApi.findById(id, filter).pipe(
      map((res: ProductItem) => {
        return res;
      }), catchError((e) => this.handleError(e))
    );
  }

  async countProductInStock(id: any) {
    return new Promise<number>((resolve, reject) => {
      this.getProductById(id).subscribe(product => {
        resolve(product.stockCount);
      });
    });
  }

  getProductCategoriesById(categoryIds: string[]) {
    // remove duplicates
    const temIds = [];
    for (const id of categoryIds) {
      if (!temIds.includes(id)) {
        temIds.push(id);
      }
    }
    categoryIds = temIds;
    const filter = {
      where: {
        id: { inq: categoryIds }
      },
    };
    return this._catApi.find<ProductCategory>(filter).pipe(
      map((res: ProductCategory[]) => {
        return res;
      }), catchError((e) => this.handleError(e))
    );

  }


  async saveProductsLocal(prods: ProductItem[]) {
    try {
      /// fix circular error
      prods.forEach(item => {
        item.productCategoryItems.forEach(it => {
          it.productItem = null;
        });
      });
    } catch (error) {

    }
    const temProds = await this.parseItemsToViews(prods);
    console.log(temProds);
    this._localStorage.setObject('products', temProds).then(_ => {
      console.log('Products update on disk');
      console.log(prods);
      this._signalService.sendAction(MY_ACTION.productsLoaded);
    });
  }
  async getProductsLocal() {
    return await this._localStorage.getObject('products');
  }

  async getProductByIdLocal(id: any) {
    const products: ProductItemView[] = (await this._localStorage.getObject('products'));
    return products.find(prod => {
      if (prod.id === id) {
        return true;
      }
      return false;
    });
  }

  async clearProductsLocal() {
    await this._localStorage.remove('products').then(_ => {
      this._signalService.sendAction(MY_ACTION.productsLoaded);
      console.log('Old products cleared');
    });
  }



  /*********************************************Categories****************************** */


  // async getProductCategories(skip = 0, limit = 1000, storeId = null, includeStore = false, includeProducts = false) {
  //   if (!storeId) {
  //     storeId = await this.storeService.getStoreIdLocal();
  //   }

  //   const where = {} as any;
  //   where.storeId = storeId;
  //   const filter = {
  //     order: 'id DESC',
  //     limit,
  //     skip,
  //     where,
  //     include: [
  //       {
  //         relation: 'photo'
  //       }
  //     ]
  //   } as any;

  //   if (includeStore) {
  //     filter.include.push({
  //       relation: 'store'
  //     });
  //   }

  //   if (includeProducts) {
  //     filter.include.push({
  //       relation: 'productItems'
  //     });
  //   }
  //   console.log(filter);

  //   return this._catApi.find<ProductCategory>(filter).pipe(
  //     map((res: ProductCategory[]) => {
  //       this.saveCategoriesLocal(res).then(_ => _);
  //       return res;
  //     }), catchError((e) => this.handleError(e))
  //   );
  // }



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

  sortProductItemsByPrice(items: ProductItem[], sortParam: SORT_PARAMETERS) {
    if (!items) {
      items = [];
    }
    console.log(sortParam);

    if (sortParam === SORT_PARAMETERS.HIGHEST_PRICE) {
      items = items.sort((a, b) => {
        if (a.currentPrice < b.currentPrice) {
          return 1;
        } else if (a.currentPrice > b.currentPrice) {
          return -1;
        } else {
          return 0;
        }
      });
    } else if (sortParam === SORT_PARAMETERS.LOWEST_PRICE) {
      items = items.sort((a, b) => {
        if (a.currentPrice > b.currentPrice) {
          return 1;
        } else if (a.currentPrice < b.currentPrice) {
          return -1;
        } else {
          return 0;
        }
      });
    } else if (sortParam === SORT_PARAMETERS.FIRST_SALES) {
      items = items.sort((a, b) => {
        if (a.salesCount < 1 && !(b.salesCount < 1)) {
          return 1;
        } else if (!(a.salesCount < 1) && b.salesCount < 1) {
          return -1;
        } else {
          return 0;
        }
      });
    } else if (sortParam === SORT_PARAMETERS.SPECIAL_OFFER) {
      items = items.sort((a, b) => {
        if (a.isGift && !b.isGift) {
          return 1;
        } else if (!a.isGift && b.isGift) {
          return -1;
        } else {
          return 0;
        }
      });
    }
    // console.log(items)
    return items;
  }

  parseItemsToViews(items: ProductItem[]) {
    return new Promise<ProductItemView[]>((resolve, reject) => {
      const views: ProductItemView[] = [];
      items.forEach((item, index) => {
        const view = {} as ProductItemView;
        view.id = item.id;
        view.isGift = item.isGift;
        view.isSale = this._util.isSales(item.salesCount);
        view.isNew = this._util.isNew(item.dateCreated);
        view.showDetailBtn = item.about ? true : false;
        view.price = item.currentPrice;
        view.prevPrice = item.prevPrice;
        this._util.getCurrency().then(currency => {
          view.currency = currency;
        });
        view.shortDesc = item.name;
        view.longDesc = item.about;
        view.photos = (item.photos || []);
        view.rackId = item.rackId;
        view.count = item.stockCount;
        view.brand = item.brand;
        view.anyImage = this._util.getAnyPhoto(item.photos);
        view.backImage = this._util.getBackPhoto(item.photos);
        view.frontImage = this._util.getFrontPhoto(item.photos) || this._util.getCoverPhoto(item.photos);
        view.categories = [];
        const catIds = [];
        (item.productCategoryItems || []).forEach(cateItem => {
          catIds.push(cateItem.productCategoryId);
        });

        // console.log(catIds);
        try {
          view.store = item.productCategoryItems.length > 0 ? item.productCategoryItems[0].productCategory.store || {} as any : {} as any;

          view.storeAddress = ((view.store.address || {} as any).country || '') + ', ' +
            ((view.store.address || {} as any).state || '') + ', ' +
            ((view.store.address || {} as any).city || '') + ', ' +
            ((view.store.address || {} as any).suburb || '') + ', ' +
            ((view.store.address || {} as any).street || '');
        } catch (error) {
          // console.log(error);
        }
        views.push(view);

        // wait to get the category name
        this.getProductCategoriesById(catIds).subscribe(categories => {
          if (categories) {
            view.categories = categories;
          }
          if (index === (items.length - 1)) {
            resolve(views);
          }
        }, error => {
          if (index === (items.length - 1)) {
            resolve(views);
          }
        });
      });
    });

  }

  parseItemToView(item: ProductItem) {
    return new Promise<ProductItemView>((resolve, reject) => {
      const view = {} as ProductItemView;
      view.id = item.id;
      view.isGift = item.isGift;
      view.isSale = this._util.isSales(item.salesCount);
      view.isNew = this._util.isNew(item.dateCreated);
      view.showDetailBtn = item.about ? true : false;
      view.price = item.currentPrice;
      view.prevPrice = item.prevPrice;
      this._util.getCurrency().then(currency => {
        view.currency = currency;
      });
      view.shortDesc = item.name;
      view.longDesc = item.about;
      view.photos = (item.photos || []);
      view.rackId = item.rackId;
      view.count = item.stockCount;
      view.brand = item.brand;
      view.anyImage = this._util.getAnyPhoto(item.photos);
      view.backImage = this._util.getBackPhoto(item.photos);
      view.frontImage = this._util.getFrontPhoto(item.photos) || this._util.getCoverPhoto(item.photos);
      view.coverImage = this._util.getCoverPhoto(item.photos);
      view.categories = [];
      const catIds = [];
      item.productCategoryItems = item.productCategoryItems || [];
      item.productCategoryItems.forEach(cateItem => {
        catIds.push(cateItem.productCategoryId);
      });
      // console.log(catIds);
      try {
        view.store = item.productCategoryItems.length > 0 ? item.productCategoryItems[0].productCategory.store || {} as any : {} as any;

        view.storeAddress = ((view.store.address || {} as any).country || '') + ', ' +
          ((view.store.address || {} as any).state || '') + ', ' +
          ((view.store.address || {} as any).city || '') + ', ' +
          ((view.store.address || {} as any).suburb || '') + ', ' +
          ((view.store.address || {} as any).street || '');
      } catch (error) {
        // console.log(error);
      }
      // wait to get the category name
      this.getProductCategoriesById(catIds).subscribe(categories => {
        if (categories) {
          view.categories = categories;
        }
        resolve(view);
      }, error => {
        resolve(view);
      });
    });
  }

  // Products that is in the same category as the
  // the selected product.
  // async getRelatedProducts(product: ProductItemView) {
  //   let products: ProductItemView[] = await this.getProductsLocal();
  //   products = products.filter(prod => {
  //     return this.isSameCategory(product, prod);
  //   });
  //   return shuffle_array(products);
  // }

  private isSameCategory(prod1: ProductItemView, prod2: ProductItemView) {
    let same = false;
    for (const cat of prod1.categories) {
      prod2.categories.forEach(cat2 => {
        if (cat.id === cat2.id) {
          same = true;
        }
      });
      if (same) { break; }
    }
    return same;
  }

  async getFeaturedProducts() {
    const products: ProductItemView[] = await this.getProductsLocal();
    return products.sort((a, b) => {
      if (a.salesCount > b.salesCount) {
        return 1;
      } else if (a.salesCount < b.salesCount) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  async getNewProducts(products: ProductItemView[] = null) {
    if (!products) {
      products = await this.getProductsLocal();
    }
    return products.filter((prod) => {
      if (prod.isNew) { return true; }
      return false
    });
  }

  async getHotestProducts(products: ProductItemView[] = null) {
    if (!products) {
      products = await this.getProductsLocal();
    }
    return products.filter((prod) => {
      if (prod.isSale) { return true; }
      return false
    });
  }

  async getGiftProducts(products: ProductItemView[] = null) {
    if (!products) {
      products = await this.getProductsLocal();
    }
    return products.filter((prod) => {
      if (prod.isGift) { return true; }
      return false;
    });
  }

  rateProduct() {

  }

  calcDiscount(product: ProductItemView) {
    if (product && !product.prevPrice) {
      product.prevPrice = product.price;
    }

    if (product && (product.prevPrice > product.price)) {
      return ((product.prevPrice - product.price) / product.prevPrice) * 100;
    } else {
      return 0;
    }
  }

  async saveCategoriesLocal(productCats: ProductCategory[]) {
    await this._localStorage.setObject('categories', productCats);
    this._signalService.sendAction(MY_ACTION.productCategoriesLoaded);
  }

  async getCategoriesLocal() {
    return await this._localStorage.getObject('categories');
  }


  /***********************ADD TO RECENTLY BROWSED PRODUCTS*************************** */

  // async saveViewProducts(products: ProductItemView[]) {
  //   await this._localStorage.setObject('viewed_products', products);
  //   this._signalService.sendAction(MY_ACTION.recently_viewed_products_change);
  // }

  // async addToViewedProducts(product: ProductItemView) {
  //   let products = (await this.getViewProducts()) || [];
  //   products.push(product);
  //   const tem = [];
  //   products.forEach(prod => {
  //     if ((!tem.includes(prod)) && tem.indexOf(prod) < 0) {
  //       tem.push(prod);
  //     }
  //   });
  //   products = tem;
  //   if (products.length > 20) {
  //     products = products.slice(products.length - 20, products.length);
  //   }
  //   await this.saveViewProducts(products);
  // }

  // async clearViewProducts() {
  //   await this._localStorage.remove('viewed_products');
  //   this._signalService.sendAction(MY_ACTION.recently_viewed_products_change);
  // }

  async getViewProducts(): Promise<ProductItemView[]> {
    return await this._localStorage.getObject('viewed_products');
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
