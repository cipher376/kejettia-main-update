import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Features } from 'src/app/models';

@Component({
  selector: 'app-feature-select',
  templateUrl: './feature-select.component.html',
  styleUrls: ['./feature-select.component.scss']
})
export class FeatureSelectComponent implements OnInit {
  private features: Features[] = [];
  private selectedFeature: Features;

  @Output() guideEvent = new EventEmitter<any>();
  @Output() selectedFeatureEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  @Input() set Features(features: Features[]) {
    this.features = features;
  }

  get Features() {
    return this.features;
  }

  get SelectedFeature() {
    return this.selectedFeature?.id
  }

  set SelectedFeature(featureId: any) {
    this.features.forEach(f => {
      if (f.id == featureId) {
        this.selectedFeature = f;
        this.selectedFeatureEvent.emit(f);
      }
    })
  }

  goToGuide(guide: string) {
    this.guideEvent.emit(guide);
  }

}
