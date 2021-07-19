import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Home2CategoryBadgeComponent } from './home2-category-badge.component';

describe('Home2CategoryBadgeComponent', () => {
  let component: Home2CategoryBadgeComponent;
  let fixture: ComponentFixture<Home2CategoryBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Home2CategoryBadgeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Home2CategoryBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
