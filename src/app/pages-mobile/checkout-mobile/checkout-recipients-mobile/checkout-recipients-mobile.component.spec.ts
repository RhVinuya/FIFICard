import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutRecipientsMobileComponent } from './checkout-recipients-mobile.component';

describe('CheckoutRecipientsMobileComponent', () => {
  let component: CheckoutRecipientsMobileComponent;
  let fixture: ComponentFixture<CheckoutRecipientsMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutRecipientsMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutRecipientsMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
