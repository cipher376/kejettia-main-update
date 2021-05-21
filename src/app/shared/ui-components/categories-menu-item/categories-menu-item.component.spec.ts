import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesMenuItemComponent } from './categories-menu-item.component';

describe('CategoriesMenuItemComponent', () => {
  let component: CategoriesMenuItemComponent;
  let fixture: ComponentFixture<CategoriesMenuItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriesMenuItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
