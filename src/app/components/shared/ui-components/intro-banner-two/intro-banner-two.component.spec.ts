import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroBannerTwoComponent } from './intro-banner-two.component';

describe('IntroBannerTwoComponent', () => {
  let component: IntroBannerTwoComponent;
  let fixture: ComponentFixture<IntroBannerTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntroBannerTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroBannerTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
