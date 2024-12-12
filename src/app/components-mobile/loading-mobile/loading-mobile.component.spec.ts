import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingMobileComponent } from './loading-mobile.component';

describe('LoadingMobileComponent', () => {
  let component: LoadingMobileComponent;
  let fixture: ComponentFixture<LoadingMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadingMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
