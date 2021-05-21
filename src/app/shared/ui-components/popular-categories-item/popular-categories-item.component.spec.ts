import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularCategoriesItemComponent } from './popular-categories-item.component';

describe('PopularCategoriesItemComponent', () => {
  let component: PopularCategoriesItemComponent;
  let fixture: ComponentFixture<PopularCategoriesItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopularCategoriesItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularCategoriesItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
