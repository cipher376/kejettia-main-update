import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroBannerOneComponent } from './intro-banner-one.component';

describe('IntroBannerOneComponent', () => {
  let component: IntroBannerOneComponent;
  let fixture: ComponentFixture<IntroBannerOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntroBannerOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroBannerOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
