import { Review } from './../../models/review';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {
  private rate = 0;
  private reviewsCount: number;
  constructor() { }

  ngOnInit(): void {
  }

  @Input() set Rating(rate: any){
    this.rate = rate;
  }

  get Rating(){
    // console.log(this.rate);
    return 'width:'+this.rate+'%;';
  }

  @Input() set ReviewsCount(count: number){
    this.reviewsCount = count;
  }

  get ReviewsCount(){
    return this.reviewsCount;
  }


}
