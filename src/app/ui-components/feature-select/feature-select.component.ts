import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Features } from 'src/app/models';

@Component({
  selector: 'app-feature-select',
  templateUrl: './feature-select.component.html',
  styleUrls: ['./feature-select.component.scss']
})
export class FeatureSelectComponent implements OnInit {
  private features: Features[] = [];

  @Output() guideEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  @Input() set Features(features: Features[]) {
    this.features = features;
  }

  get Features() {
    return this.features;
  }

  goToGuide(guide: string) {
    this.guideEvent.emit(guide);
  }

}
