import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-home2',
  templateUrl: './home2.component.html',
  styleUrls: ['./home2.component.scss']
})
export class Home2Component implements OnInit, AfterViewInit {

  constructor() { }



  ngAfterViewInit(): void {
    setTimeout(() => {

      dispatchEvent(new Event('load'));
      dispatchEvent(new Event('mousewheel'));

    }, 1000);

  }

  ngOnInit(): void {
  }

}
