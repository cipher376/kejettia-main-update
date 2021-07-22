import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-mixed-search-filter',
  templateUrl: './mixed-search-filter.component.html',
  styleUrls: ['./mixed-search-filter.component.scss']
})
export class MixedSearchFilterComponent implements OnInit {



  @Output() itemsGridSizeEvent = new EventEmitter<number>();
  @Output() sortKeyEvent = new EventEmitter<string>();
  @Output() layoutEvent = new EventEmitter<string>(); // list, grid

  layout = 'grid';
  private gridSize = 10; // number of items per page
  private sortKey = 'default';


  constructor() { }

  ngOnInit(): void {
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
