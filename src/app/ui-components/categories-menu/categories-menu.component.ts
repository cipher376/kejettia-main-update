import { StoreService } from './../../shared/services/store.service';
import { StoreCategory } from 'src/app/models';
import { Component, Input, OnInit } from '@angular/core';



@Component({
  selector: 'app-categories-menu',
  templateUrl: './categories-menu.component.html',
  styleUrls: ['./categories-menu.component.scss']
})
export class CategoriesMenuComponent implements OnInit {

  private storeCategories: StoreCategory[] = [];

  constructor(
  ) { }

  ngOnInit(): void {
  }

  @Input() set StoreCategories(cat: StoreCategory[]) {
    this.storeCategories = cat;
  }

  get StoreCategories() {
    return this.storeCategories;
  }



}
