import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MixedSearchComponent } from './mixed-search.component';

describe('MixedSearchComponent', () => {
  let component: MixedSearchComponent;
  let fixture: ComponentFixture<MixedSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MixedSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MixedSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
