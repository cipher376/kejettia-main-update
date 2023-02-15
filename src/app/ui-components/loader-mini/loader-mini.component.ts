import { Component, OnInit, AfterViewInit, Input } from '@angular/core';

@Component({
  selector: 'app-loader-mini',
  templateUrl: './loader-mini.component.html',
  styleUrls: ['./loader-mini.component.scss']
})
export class LoaderMiniComponent implements OnInit, AfterViewInit {
  topMargin = 0;
  message = '';
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


  @Input() set TopMargin(m: any) {
    this.topMargin = m;
  }


  @Input() set Message(m: string){
    this.message = m;
  }

  ngOnInit(): void {
  }

}
