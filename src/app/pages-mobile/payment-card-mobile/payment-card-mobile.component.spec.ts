import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentCardMobileComponent } from './payment-card-mobile.component';

describe('PaymentCardMobileComponent', () => {
  let component: PaymentCardMobileComponent;
  let fixture: ComponentFixture<PaymentCardMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentCardMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentCardMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
