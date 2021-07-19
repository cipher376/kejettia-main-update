import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Home2SliderComponent } from './home2-slider.component';

describe('Home2SliderComponent', () => {
  let component: Home2SliderComponent;
  let fixture: ComponentFixture<Home2SliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Home2SliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Home2SliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
