import { Router } from '@angular/router';
import { PhotoDisplayType } from './../../models/photo';
import { StoreService } from 'src/app/shared/services/store.service';
import { Store } from 'src/app/models';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { UtilityService } from 'src/app/shared/services';

@Component({
  selector: 'app-store-item',
  templateUrl: './store-item.component.html',
  styleUrls: ['./store-item.component.scss']
})
export class StoreItemComponent implements OnInit {
  private store: Store;
  photoUrl = '';

  @Input() layout = 'grid'; // 'list'

  constructor(
    private cd: ChangeDetectorRef,
    private router: Router,
    private storeService: StoreService
  ) { }

  ngOnInit(): void {
  }

  @Input() set Store(store: Store) {
    this.store = store;
    this.photoUrl =  StoreService.getPhotoUrlByDisplayTypeLocal(this.store?.photos, 'cover', true);
    this.cd.detectChanges();
  }

  get Store() {
    return this.store;
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
