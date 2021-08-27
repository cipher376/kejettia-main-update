import { Router } from '@angular/router';
import { PHOTO_DISPLAY_TYPES } from './../../config';
import { StoreService } from 'src/app/shared/services/store.service';
import { Component, Input, OnInit, AfterContentInit } from '@angular/core';
import { Store } from 'src/app/models';

@Component({
  selector: 'app-intro-banner-three',
  templateUrl: './intro-banner-three.component.html',
  styleUrls: ['./intro-banner-three.component.scss']
})
export class IntroBannerThreeComponent implements OnInit, AfterContentInit {
  private store: Store;
  image = '';
  constructor(
    private router: Router,
    private storeService: StoreService
  ) { }


  ngAfterContentInit(): void {
    this.getImage();

  }

  ngOnInit(): void {
  }

  @Input() set Store(store: Store) {
    this.store = store;
    this.getImage();
  }

  get Store() {
    return this.store;
  }

  getImage() {
    this.image = StoreService.getPhotoUrlByDisplayTypeLocal(this.store.photos, PHOTO_DISPLAY_TYPES.COVER, true, true)
  }


  goToStore(){
    this.storeService.setSelectedStoreLocal(this.store).then(()=>{
      this.router.navigateByUrl('/stores/pages/home');
    });
  }


}
