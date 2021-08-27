import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListWidgetComponent } from './product-list-widget.component';

describe('ProductListWidgetComponent', () => {
  let component: ProductListWidgetComponent;
  let fixture: ComponentFixture<ProductListWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductListWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
