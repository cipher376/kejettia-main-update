import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularStoresComponent } from './popular-stores.component';

describe('PopularStoresComponent', () => {
  let component: PopularStoresComponent;
  let fixture: ComponentFixture<PopularStoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopularStoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularStoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
