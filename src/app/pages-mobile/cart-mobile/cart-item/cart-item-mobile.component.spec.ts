import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartItemMobileComponent } from './cart-item-mobile.component';

describe('CartItemMobileComponent', () => {
  let component: CartItemMobileComponent;
  let fixture: ComponentFixture<CartItemMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartItemMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartItemMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
