import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentBrowsedComponent } from './recent-browsed.component';

describe('RecentBrowsedComponent', () => {
  let component: RecentBrowsedComponent;
  let fixture: ComponentFixture<RecentBrowsedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentBrowsedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentBrowsedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
