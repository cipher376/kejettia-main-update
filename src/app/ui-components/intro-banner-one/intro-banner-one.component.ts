import { Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { UtilityService } from 'src/app/shared/services';
import { Component, Input, OnInit } from '@angular/core';
import { Urls } from 'src/app/config';

@Component({
  selector: 'app-intro-banner-one',
  templateUrl: './intro-banner-one.component.html',
  styleUrls: ['./intro-banner-one.component.scss']
})
export class IntroBannerOneComponent implements OnInit {

  backgroundImage = 'assets/images/demos/demo5/banners/3.jpg';
  title ='THIS MONTH SALE';
  content = '70% OFF ON  XBOX & PS4/PS5';

  searchKey = 'all';

  constructor(
    private utilityService: UtilityService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  @Input() set BackgroundImage(url: string){
    this.backgroundImage = url;
  }


  @Input() set Title(title: string){
    this.title = title;
  }


  @Input() set Content(content: string){
    this.content = content;
  }

  @Input() set SearchKey(key: string){
    this.searchKey = key;
  }

  goToSearch(){
    this.utilityService.setSearchKey(this.searchKey);
    this.router.navigate([Urls.search])
  }


}
