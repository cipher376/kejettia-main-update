import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Home2CategoriesComponent } from './home2-categories.component';

describe('Home2CategoriesComponent', () => {
  let component: Home2CategoriesComponent;
  let fixture: ComponentFixture<Home2CategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Home2CategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Home2CategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
