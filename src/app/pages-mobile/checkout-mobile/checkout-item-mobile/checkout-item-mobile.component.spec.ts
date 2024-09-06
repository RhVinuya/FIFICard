import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutItemMobileComponent } from './checkout-item-mobile.component';

describe('CheckoutItemMobileComponent', () => {
  let component: CheckoutItemMobileComponent;
  let fixture: ComponentFixture<CheckoutItemMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutItemMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutItemMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
