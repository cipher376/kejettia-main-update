import { Component, OnInit, AfterContentInit, AfterViewInit } from '@angular/core';

var Bodymovin;
@Component({
  selector: 'app-loader-full',
  templateUrl: './loader-full.component.html',
  styleUrls: ['./loader-full.component.scss']
})
export class LoaderFullComponent implements OnInit, AfterViewInit {

  constructor() {
    // const script = document.createElement('script');
    // script.id = 'loader';
    // script.src = '../../../assets/lottie-loader/lottie.js';
    // document.head.appendChild(script);
  }
  ngAfterViewInit(): void {
    var animation = (window as any).lottie.loadAnimation({
      container: document.getElementById('bm'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '../../../assets/lottie-loader/data.json'
    })

    // console.log(animation);

  }

  ngOnInit(): void {

  }

}
