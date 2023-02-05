import { Urls } from 'src/app/config';
import { Router } from '@angular/router';
import { NO_IMAGE } from './../../config';
import { environment } from './../../../environments/environment';
import { PageInfo } from './../../models/page';
import { StoreService } from 'src/app/shared/services/store.service';
import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/app/shared/services';
import { WcProduct } from 'src/app/models/woocommerce.model';
import { WooCommerceStoreService } from 'src/app/shared/services/wc-store.service';

@Component({
  selector: 'app-related-product',
  templateUrl: './related-product.component.html',
  styleUrls: ['./related-product.component.scss']
})
export class RelatedProductComponent implements OnInit {

  selectedProduct: WcProduct;

  relatedProducts: WcProduct[] = [];
  relatedProductPhotos: string[] = [];


  constructor(
    private storeService: StoreService,
    private wcStoreService: WooCommerceStoreService,
    private router: Router,
    private utilityService: UtilityService
  ) { }

  ngOnInit(): void {
    this.selectedProduct = this.wcStoreService.getSelectedProductLocalSync();
  }

  refreshProduct() {
    this.wcStoreService.getProductById(this.selectedProduct.id).subscribe(product => {
      this.selectedProduct = product;
      this.loadRelatedProducts();
    });
  }

  loadRelatedProducts() {
    this.wcStoreService.getLinkedProduct(this.selectedProduct?.id).subscribe((products: WcProduct[]) => {
      this.relatedProducts = products;
      products?.forEach(prod => {
        this.relatedProductPhotos.push(StoreService.getPhotoUrlByDisplayTypeLocal(prod.images, 'cover', true, true) || NO_IMAGE)
      });
    })
  
  }

  goToProduct(product: WcProduct) {
    this.wcStoreService.setSelectedProductLocal(product).then(() => {
      this.router.navigateByUrl(Urls.productDetails+'/'+product?.id);
    })
  }

  isNew(product: WcProduct) {
    return this.wcStoreService.isNew(product);
  }

  getCategory(product: WcProduct) {
    if (product?.categories?.length > 0) {
      return product?.categories[0]?.name
    }
    return '';
  }

  searchCategory(product) {
    if (product?.categories?.length > 0) {
    this.utilityService.setSearchKey(product?.categories[0]?.name);

      this.router.navigate([Urls.search])
    }
  }

  getRating(prod: WcProduct){
    return this.wcStoreService.getProductRating(prod);
  }

}
