import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandsHorizontalComponent } from './brands-horizontal.component';

describe('BrandsHorizontalComponent', () => {
  let component: BrandsHorizontalComponent;
  let fixture: ComponentFixture<BrandsHorizontalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandsHorizontalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandsHorizontalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
