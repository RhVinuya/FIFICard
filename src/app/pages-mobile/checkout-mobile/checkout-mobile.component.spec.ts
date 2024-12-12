import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutMobileComponent } from './checkout-mobile.component';

describe('CheckoutMobileComponent', () => {
  let component: CheckoutMobileComponent;
  let fixture: ComponentFixture<CheckoutMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
