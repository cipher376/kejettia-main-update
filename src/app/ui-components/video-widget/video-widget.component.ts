import { environment } from './../../../environments/environment';
import { Component, Input, OnInit } from '@angular/core';
import { Video } from 'src/app/models';

@Component({
  selector: 'app-video-widget',
  templateUrl: './video-widget.component.html',
  styleUrls: ['./video-widget.component.scss']
})
export class VideoWidgetComponent implements OnInit {

  private video: Video = new Video();

  fileRootUrl = environment.file_api_download_url_root ;

  constructor() { }

  ngOnInit(): void {
  }

  @Input() set Video(vid: Video) {
    this.video = vid;
  }

  get Video(){
    return this.video
  }

}
