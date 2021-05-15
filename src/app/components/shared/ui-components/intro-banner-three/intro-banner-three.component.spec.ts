import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroBannerThreeComponent } from './intro-banner-three.component';

describe('IntroBannerThreeComponent', () => {
  let component: IntroBannerThreeComponent;
  let fixture: ComponentFixture<IntroBannerThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntroBannerThreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroBannerThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
