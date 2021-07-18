import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/shared/services';
import { User } from 'src/app/models';
import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, AfterViewInit {
  loggedUser: User = new User();

  constructor(
    private userService: UserService
  ) { }


  ngAfterViewInit(): void {
    this.loggedUser = this.userService.getLoggedUserLocalSync();
  }

  ngOnInit(): void {
  }

  getProfilePhoto() {
    if (this.loggedUser?.profilePhoto)
      return environment.file_api_download_url_root + this.loggedUser?.profilePhoto?.source;
    return '';
  }

}
