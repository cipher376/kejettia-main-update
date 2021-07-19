import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonialWidgetComponent } from './testimonial-widget.component';

describe('TestimonialWidgetComponent', () => {
  let component: TestimonialWidgetComponent;
  let fixture: ComponentFixture<TestimonialWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestimonialWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestimonialWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
