import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewShippingAndDeliveryComponent } from './new-shipping-and-delivery.component';

describe('NewShippingAndDeliveryComponent', () => {
  let component: NewShippingAndDeliveryComponent;
  let fixture: ComponentFixture<NewShippingAndDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewShippingAndDeliveryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewShippingAndDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
