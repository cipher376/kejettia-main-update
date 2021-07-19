import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailsSimpleComponent } from './product-details-simple.component';

describe('ProductDetailsSimpleComponent', () => {
  let component: ProductDetailsSimpleComponent;
  let fixture: ComponentFixture<ProductDetailsSimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductDetailsSimpleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailsSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
