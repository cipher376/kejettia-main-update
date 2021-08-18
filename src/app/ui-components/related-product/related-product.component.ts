import { Urls } from 'src/app/config';
import { Router } from '@angular/router';
import { NO_IMAGE } from './../../config';
import { environment } from './../../../environments/environment';
import { PageInfo } from './../../models/page';
import { StoreService } from 'src/app/shared/services/store.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models';

@Component({
  selector: 'app-related-product',
  templateUrl: './related-product.component.html',
  styleUrls: ['./related-product.component.scss']
})
export class RelatedProductComponent implements OnInit {

  selectedProduct: Product;

  relatedProducts: Product[] = [];
  relatedProductPhotos: string[] = [];


  constructor(
    private storeService: StoreService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.selectedProduct = this.storeService.getSelectedProductLocalSync();
  }

  refreshProduct() {
    this.storeService.getProductById(this.selectedProduct.id).subscribe(product => {
      this.selectedProduct = product;
      this.loadRelatedProducts();
    });
  }

  loadRelatedProducts() {
    let searchKey = '';
    this.selectedProduct?.productCategoryItems?.forEach(item => {
      searchKey += ' ' + item?.name;
    });

    const pageInfo = {} as PageInfo;
    pageInfo.limit = 15;
    pageInfo.limit = 0;
    pageInfo.pageSize = 15;

    this.storeService.searchProduct(searchKey, pageInfo).subscribe((products: Product[]) => {
      this.relatedProducts = products;
      products?.forEach(prod => {
        this.relatedProductPhotos.push(StoreService.getPhotoUrlByDisplayTypeLocal(prod.photos, 'cover', true, true) || NO_IMAGE)
      });
    })
  }

  goToProduct(product: Product) {
    this.storeService.setSelectedProductLocal(product).then(() => {
      this.router.navigateByUrl(Urls.productDetails+'/'+product?.id);
    })
  }

  isNew(product: Product) {
    return StoreService.isNew(product);
  }

  getCategory(product: Product) {
    if (product?.productCategoryItems?.length > 0) {
      return product?.productCategoryItems[0]?.name
    }
    return '';
  }

  searchCategory(product) {
    if (product?.productCategoryItems?.length > 0) {
      this.router.navigateByUrl(Urls.search + ';cat=' + (product?.productCategoryItems[0]?.name))
    }
  }

  getRating(prod: Product){
    return StoreService.getProductRating(prod);
  }

}
