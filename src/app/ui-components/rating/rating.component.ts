import { Review } from './../../models/review';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {
  private rate = 0;
  private reviews: Review[] = [];
  constructor() { }

  ngOnInit(): void {
  }

  @Input() set Rating(rate: any){
    this.rate = rate;
  }

  get Rating(){
    return 'width:'+this.rate+'%;';
  }

  @Input() set Reviews(reviews: Review[]){
    this.reviews = reviews;
  }

  get Reviews(){
    return this.reviews;
  }


}
