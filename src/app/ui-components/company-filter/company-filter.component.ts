import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-company-filter',
  templateUrl: './company-filter.component.html',
  styleUrls: ['./company-filter.component.scss']
})
export class CompanyFilterComponent implements OnInit {


  @Output() itemsGridSizeEvent = new EventEmitter<number>();
  @Output() sortKeyEvent = new EventEmitter<string>();
  @Output() layoutEvent = new EventEmitter<string>(); // list, grid

  layout = 'grid';
  private gridSize = 10; // number of items per page
  private sortKey = 'default';


  constructor() { }

  ngOnInit() {
  }

  set GridSize(size: number) {
    this.itemsGridSizeEvent.emit(size);
    this.gridSize = size;
  }

  get GridSize() {
    return this.gridSize
  }


  set SortKey(key: string) {
    this.sortKeyEvent.emit(key);
    this.sortKey = key;
  }

  get SortKey() {
    return this.sortKey;
  }

  set Layout(layout: string) {
    this.layoutEvent.emit(layout);
    this.layout = layout;
  }

  get Layout() {
    return this.layout;
  }
}
