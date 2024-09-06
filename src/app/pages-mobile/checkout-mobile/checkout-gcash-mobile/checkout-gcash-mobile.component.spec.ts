import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutGcashMobileComponent } from './checkout-gcash-mobile.component';

describe('CheckoutGcashMobileComponent', () => {
  let component: CheckoutGcashMobileComponent;
  let fixture: ComponentFixture<CheckoutGcashMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutGcashMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutGcashMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
