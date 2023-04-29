import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Credentials } from 'src/app/models';
import { MyAuthService } from 'src/app/shared/services';
declare const gapi: any;

@Component({
  selector: 'app-google-login',
  templateUrl:'./google-login.component.html',
  styleUrls:['./google-login.component.scss']
})
export class GoogleLoginComponent implements OnInit {

  @Output() onSuccess = new EventEmitter<any>();
  @Output() onFailure = new EventEmitter<any>();

  googleCred:Credentials = new Credentials();
  link: string;

  constructor(
    private route: ActivatedRoute, 
    private auth: MyAuthService
  ) {

  }

  ngOnInit() {
    this.getUrlLink();

    this.route.queryParams.subscribe(p => {
      // console.log(p);
      if(p?.auth){
        this.auth.loginThirdParty(JSON.parse(p?.auth));
      }
    })
  }

  async onSignIn() {
    window.location.href= this.link
  }

  getUrlLink(){
    this.auth.getGoogleAuthLink().subscribe(link=> {
      this.link = link.link;
      // console.log(this.link);
    }, (error)=>console.log(error))
  }

  


}
