import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicServiceSearchComponent } from './public-service-search.component';

describe('PublicServiceSearchComponent', () => {
  let component: PublicServiceSearchComponent;
  let fixture: ComponentFixture<PublicServiceSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicServiceSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicServiceSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
