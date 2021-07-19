import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailsCustomComponent } from './product-details-custom.component';

describe('ProductDetailsCustomComponent', () => {
  let component: ProductDetailsCustomComponent;
  let fixture: ComponentFixture<ProductDetailsCustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductDetailsCustomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailsCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
