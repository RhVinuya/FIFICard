import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSummaryMobileComponent } from './order-summary-mobile.component';

describe('OrderSummaryMobileComponent', () => {
  let component: OrderSummaryMobileComponent;
  let fixture: ComponentFixture<OrderSummaryMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderSummaryMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderSummaryMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
