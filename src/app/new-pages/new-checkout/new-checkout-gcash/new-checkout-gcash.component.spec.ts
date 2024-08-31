import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCheckoutGcashComponent } from './new-checkout-gcash.component';

describe('NewCheckoutGcashComponent', () => {
  let component: NewCheckoutGcashComponent;
  let fixture: ComponentFixture<NewCheckoutGcashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCheckoutGcashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewCheckoutGcashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
