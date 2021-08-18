import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverySelectComponent } from './delivery-select.component';

describe('DeliverySelectComponent', () => {
  let component: DeliverySelectComponent;
  let fixture: ComponentFixture<DeliverySelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliverySelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliverySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
