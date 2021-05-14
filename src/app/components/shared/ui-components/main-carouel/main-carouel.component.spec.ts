import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCarouelComponent } from './main-carouel.component';

describe('MainCarouelComponent', () => {
  let component: MainCarouelComponent;
  let fixture: ComponentFixture<MainCarouelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainCarouelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainCarouelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
