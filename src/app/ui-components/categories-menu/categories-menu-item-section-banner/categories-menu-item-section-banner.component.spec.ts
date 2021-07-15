import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesMenuItemSectionBannerComponent } from './categories-menu-item-section-banner.component';

describe('CategoriesMenuItemSectionBannerComponent', () => {
  let component: CategoriesMenuItemSectionBannerComponent;
  let fixture: ComponentFixture<CategoriesMenuItemSectionBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriesMenuItemSectionBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesMenuItemSectionBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
