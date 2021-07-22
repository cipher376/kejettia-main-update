import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderFullComponent } from './loader-full.component';

describe('LoaderFullComponent', () => {
  let component: LoaderFullComponent;
  let fixture: ComponentFixture<LoaderFullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoaderFullComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
