import { StoreService } from './../../shared/services/store.service';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Store } from 'src/app/models';
import { UtilityService } from 'src/app/shared/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-best-seller-item',
  templateUrl: './best-seller-item.component.html',
  styleUrls: ['./best-seller-item.component.scss']
})
export class BestSellerItemComponent implements OnInit {

  store = new Store();
  photoUrl = '';
  constructor(
    private cd: ChangeDetectorRef,
    private router: Router,
    private storeService: StoreService
     ) { }

  ngOnInit() {
  }


  @Input() set Store(store: Store){
    this.store = store;
    this.photoUrl =  StoreService.getPhotoUrlByDisplayTypeLocal(this.store?.photos, 'cover', true);
    // console.log(this.photoUrl);
    // console.log(store);
    this.cd.detectChanges();

  }



  getCategory() {
    if (this.store?.storeCategories?.length > 0) {
      return this.store?.storeCategories[0]?.name
    }
    return '';
  }

  getRating() {
    StoreService.getStoreRating(this.store);
  }

  get IsNew() {
    if (UtilityService.calcDatesDiffInDays(this.store?.dateCreated) <= 7) // within 7 days means new
      return true;
    return false;
  }

  goToStore(){
    this.storeService.setSelectedStoreLocal(this.store).then(()=>{
      this.router.navigateByUrl('/stores/pages/home');
    });
  }
}
