import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaglineWidgetComponent } from './tagline-widget.component';

describe('TaglineWidgetComponent', () => {
  let component: TaglineWidgetComponent;
  let fixture: ComponentFixture<TaglineWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaglineWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaglineWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
