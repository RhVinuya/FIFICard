import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePaymentThumbComponent } from './profile-payment-thumb.component';

describe('ProfilePaymentThumbComponent', () => {
  let component: ProfilePaymentThumbComponent;
  let fixture: ComponentFixture<ProfilePaymentThumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilePaymentThumbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePaymentThumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
