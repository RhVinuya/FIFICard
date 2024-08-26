import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCheckoutSenderComponent } from './new-checkout-sender.component';

describe('NewCheckoutSenderComponent', () => {
  let component: NewCheckoutSenderComponent;
  let fixture: ComponentFixture<NewCheckoutSenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCheckoutSenderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewCheckoutSenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
