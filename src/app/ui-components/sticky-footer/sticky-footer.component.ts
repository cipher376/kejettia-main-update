import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sticky-footer',
  templateUrl: './sticky-footer.component.html',
  styleUrls: ['./sticky-footer.component.scss']
})
export class StickyFooterComponent implements OnInit, AfterViewInit {
  isMobile = false;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }


  ngAfterViewInit() {
    this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (this.isMobile) {
      window.scrollTo(0, 0);
    }
  }
  openMenuCategories() {
    // navigate to search and then open filter
    this.router.navigateByUrl('/main/pages/search;fromMenu=true');
  }

}
