import { MY_ACTION, SignalService } from './../../shared/services/signal.service';
import { NO_IMAGE } from './../../config';
import { environment } from 'src/environments/environment';
import { UserService, MyAuthService } from 'src/app/shared/services';
import { Photo, User } from 'src/app/models';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FileService } from 'src/app/shared/services/file.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, AfterViewInit {
  loggedUser: User = new User();

  profilePhoto: Photo;
  uploadUrl = environment.file_api_upload_photo_video_url_root + '/true'
  constructor(
    private userService: UserService,
    private fileService: FileService,
    private signal: SignalService,
    private authService: MyAuthService
  ) { }


  ngAfterViewInit(): void {
    this.loggedUser = this.userService.getLoggedUserLocalSync();

    this.profilePhoto = this.loggedUser?.profilePhoto;
  }

  ngOnInit(): void {
    this.signal._action$.subscribe(action => {
      if (action = MY_ACTION.reloadUser) {
        this.loggedUser = this.userService.getLoggedUserLocalSync();
        console.log(this.loggedUser);
      }
    });
  }

  getProfilePhoto() {
    if (this.profilePhoto)
      return environment.file_api_download_url_root + this.loggedUser?.profilePhoto?.source;
    return environment.file_api_download_url_root + NO_IMAGE;
  }

  set ProfilePhoto(file: any) {
    if (Array.isArray(file))
      this.profilePhoto = file[0];
    if (this.profilePhoto?.id) {
      const photo = new Photo();
      photo.source = this.profilePhoto?.source;
      photo.fileId = this.profilePhoto?.id;
      photo.mimeType = this.profilePhoto?.mimeType;
      photo.size = this.profilePhoto?.size;
      photo.thumbnail = 'thumb_' + this.profilePhoto?.source;
      this.profilePhoto = photo;
      console.log(this.profilePhoto);
      this.userService.updateProfilePhoto(this.loggedUser?.id as any, photo)?.subscribe((photo: Photo) => {
        console.log(photo);
        if (photo) {
          this.loggedUser.profilePhoto = photo;
          setTimeout(() => {
            this.loggedUser = this.loggedUser;
          }, 2000);
          this.userService.setLoggedUserLocalSync(this.loggedUser);
        }
        if (this.loggedUser && this.loggedUser?.id === this.loggedUser?.id) {
          this.loggedUser.profilePhoto = photo;
          this.userService.setLoggedUserLocalSync(this.loggedUser);
        }
      }, error => {
        console.log(error);
        alert('Changing profile picture failed');
      })
    }
  }


  verifyEmail() {
    this.authService.requestEmailVerificationLink(this.loggedUser?.email).subscribe(((res: any) => {
      if (res?.status == 'success') {
        alert('Verification link is sent to your email');
      }else {
        alert('Unable to verify your email, please try again later or contact us for support');

      }
    }))
  }
}
