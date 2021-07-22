import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderMiniComponent } from './loader-mini.component';

describe('LoaderMiniComponent', () => {
  let component: LoaderMiniComponent;
  let fixture: ComponentFixture<LoaderMiniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoaderMiniComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderMiniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
