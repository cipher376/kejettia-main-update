import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {
  private rate = 0;
  constructor() { }

  ngOnInit(): void {
  }

  @Input() set Rating(rate: number){
    this.rate = rate;
  }

  get Rating(){
    return this.rate;
  }

}
