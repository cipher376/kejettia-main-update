import { Store } from 'src/app/models';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-store-item',
  templateUrl: './store-item.component.html',
  styleUrls: ['./store-item.component.scss']
})
export class StoreItemComponent implements OnInit {
  private store: Store;

  constructor() { }

  ngOnInit(): void {
  }

  @Input() set Store(store: Store) {
    this.store = store;
  }

  get Store() {
    return this.store;
  }

}
