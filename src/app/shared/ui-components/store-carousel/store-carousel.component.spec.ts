import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreCarouselComponent } from './store-carousel.component';

describe('StoreCarouselComponent', () => {
  let component: StoreCarouselComponent;
  let fixture: ComponentFixture<StoreCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreCarouselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
