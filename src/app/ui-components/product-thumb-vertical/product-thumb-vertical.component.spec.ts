import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductThumbVerticalComponent } from './product-thumb-vertical.component';

describe('ProductThumbVerticalComponent', () => {
  let component: ProductThumbVerticalComponent;
  let fixture: ComponentFixture<ProductThumbVerticalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductThumbVerticalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductThumbVerticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
