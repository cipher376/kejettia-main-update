import { Component, Input, OnInit } from '@angular/core';
import { Photo } from 'src/app/models';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home2-slider',
  templateUrl: './home2-slider.component.html',
  styleUrls: ['./home2-slider.component.scss']
})
export class Home2SliderComponent implements OnInit {

  private photos: Photo[] = [];
  fileUrl = environment.file_api_download_url_root;

  constructor() { }

  ngOnInit() {

  }



  @Input() set Photos(photos: Photo[]) {
    this.photos = photos;
  }

  get Photos() {
    return this.photos;
  }

  getPhotoPath(photo: Photo) {
    return this.fileUrl + photo.source
  }

}
