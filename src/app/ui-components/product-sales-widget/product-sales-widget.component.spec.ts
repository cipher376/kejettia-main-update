import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSalesWidgetComponent } from './product-sales-widget.component';

describe('ProductSalesWidgetComponent', () => {
  let component: ProductSalesWidgetComponent;
  let fixture: ComponentFixture<ProductSalesWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductSalesWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSalesWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
