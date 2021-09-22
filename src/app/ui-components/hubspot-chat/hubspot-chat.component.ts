import { Component, OnInit } from '@angular/core';
import { HUBSPOT_CLIENT_DEVELOPER_KEY, HUBSPOT_CLIENT_KEY } from 'src/app/config';
// import * as hubspot from '@hubspot/api-client'

@Component({
  selector: 'app-hubspot-chat',
  templateUrl: './hubspot-chat.component.html',
  styleUrls: ['./hubspot-chat.component.scss']
})
export class HubspotChatComponent implements OnInit {

  hubspotClient: any;


  constructor() {
    // this.hubspotClient = new hubspot.Client({ apiKey: HUBSPOT_CLIENT_KEY, developerApiKey: HUBSPOT_CLIENT_DEVELOPER_KEY})

  }

  ngOnInit(): void {
  }

}
