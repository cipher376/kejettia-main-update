import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HubspotChatComponent } from './hubspot-chat.component';

describe('HubspotChatComponent', () => {
  let component: HubspotChatComponent;
  let fixture: ComponentFixture<HubspotChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HubspotChatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HubspotChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
