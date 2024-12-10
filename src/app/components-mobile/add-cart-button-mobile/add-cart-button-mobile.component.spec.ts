import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCartButtonMobileComponent } from './add-cart-button-mobile.component';

describe('AddCartButtonMobileComponent', () => {
  let component: AddCartButtonMobileComponent;
  let fixture: ComponentFixture<AddCartButtonMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCartButtonMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCartButtonMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
