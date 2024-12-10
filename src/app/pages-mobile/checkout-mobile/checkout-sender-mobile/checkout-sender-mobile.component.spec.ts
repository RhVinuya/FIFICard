import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutSenderMobileComponent } from './checkout-sender-mobile.component';

describe('CheckoutSenderMobileComponent', () => {
  let component: CheckoutSenderMobileComponent;
  let fixture: ComponentFixture<CheckoutSenderMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutSenderMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutSenderMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
