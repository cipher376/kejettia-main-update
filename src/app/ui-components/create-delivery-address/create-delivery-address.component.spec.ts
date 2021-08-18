import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDeliveryAddressComponent } from './create-delivery-address.component';

describe('CreateDeliveryAddressComponent', () => {
  let component: CreateDeliveryAddressComponent;
  let fixture: ComponentFixture<CreateDeliveryAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateDeliveryAddressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDeliveryAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
