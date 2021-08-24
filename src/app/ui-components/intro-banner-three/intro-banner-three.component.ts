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
  constructor() { }


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

    this.image = StoreService.getPhotoUrlByDisplayTypeLocal(this.store.photos, 'cover', true, true)
  }

}
