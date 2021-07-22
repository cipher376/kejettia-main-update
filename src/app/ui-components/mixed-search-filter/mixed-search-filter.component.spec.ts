import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MixedSearchFilterComponent } from './mixed-search-filter.component';

describe('MixedSearchFilterComponent', () => {
  let component: MixedSearchFilterComponent;
  let fixture: ComponentFixture<MixedSearchFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MixedSearchFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MixedSearchFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
