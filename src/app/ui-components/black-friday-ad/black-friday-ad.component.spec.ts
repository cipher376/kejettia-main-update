import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlackFridayAdComponent } from './black-friday-ad.component';

describe('BlackFridayAdComponent', () => {
  let component: BlackFridayAdComponent;
  let fixture: ComponentFixture<BlackFridayAdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlackFridayAdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlackFridayAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
