import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCheckoutRecipientsComponent } from './new-checkout-recipients.component';

describe('NewCheckoutRecipientsComponent', () => {
  let component: NewCheckoutRecipientsComponent;
  let fixture: ComponentFixture<NewCheckoutRecipientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCheckoutRecipientsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewCheckoutRecipientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
