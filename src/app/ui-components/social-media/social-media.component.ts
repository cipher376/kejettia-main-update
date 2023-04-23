import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-social-media',
  templateUrl: './social-media.component.html',
  styleUrls: ['./social-media.component.scss']
})
export class SocialMediaComponent implements OnInit {
  public URL: string;
  public TITLE: string;


constructor(private location: Location, private title: Title) {
    this.URL = window.location.href;
    this.TITLE = title.getTitle();
  }

  ngOnInit(): void {
  }

}
