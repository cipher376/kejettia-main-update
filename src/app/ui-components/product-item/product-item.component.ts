import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models';
import { UtilityService } from 'src/app/shared/services';
import { StoreService } from 'src/app/shared/services/store.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  private product: Product;
  photoUrl = '';

  @Input() layout = 'grid'; // 'list'

  constructor(
    private cd: ChangeDetectorRef,
    private router: Router,
    private storeService: StoreService
  ) { }

  ngOnInit(): void {
  }

  @Input() set Product(product: Product) {
    this.product = product;
    this.photoUrl =  StoreService.getPhotoUrlByDisplayTypeLocal(this.product?.photos, 'cover', true);
    this.cd.detectChanges();
  }

  get Product() {
    return this.product;
  }



  getCategory() {
    if (this.product?.productCategoryItems?.length>0) {
      return this.product?.productCategoryItems[0]?.name
    }
    return '';
  }

  getRating() {
    StoreService.getProductRating(this.product);
  }

  get IsNew() {
    if (UtilityService.calcDatesDiffInDays(this.product?.dateCreated) <= 7) // within 7 days means new
      return true;
    return false;
  }

  goToProduct(){
    this.storeService.setSelectedProductLocal(this.product).then(()=>{
      this.router.navigateByUrl('/stores/pages/product-details');
    });
  }


}
