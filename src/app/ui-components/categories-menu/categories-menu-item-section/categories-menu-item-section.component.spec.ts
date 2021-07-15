import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesMenuItemSectionComponent } from './categories-menu-item-section.component';

describe('CategoriesMenuItemSectionComponent', () => {
  let component: CategoriesMenuItemSectionComponent;
  let fixture: ComponentFixture<CategoriesMenuItemSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriesMenuItemSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesMenuItemSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
