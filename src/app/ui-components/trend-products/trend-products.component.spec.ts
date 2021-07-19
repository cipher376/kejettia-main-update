import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendProductsComponent } from './trend-products.component';

describe('TrendProductsComponent', () => {
  let component: TrendProductsComponent;
  let fixture: ComponentFixture<TrendProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrendProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
