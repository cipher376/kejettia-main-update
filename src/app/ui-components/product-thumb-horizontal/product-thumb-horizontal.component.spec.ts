import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductThumbHorizontalComponent } from './product-thumb-horizontal.component';

describe('ProductThumbHorizontalComponent', () => {
  let component: ProductThumbHorizontalComponent;
  let fixture: ComponentFixture<ProductThumbHorizontalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductThumbHorizontalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductThumbHorizontalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
