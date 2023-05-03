import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroBannerFourComponent } from './intro-banner-four.component';

describe('IntroBannerFourComponent', () => {
  let component: IntroBannerFourComponent;
  let fixture: ComponentFixture<IntroBannerFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntroBannerFourComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroBannerFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
