import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralsMobileComponent } from './referrals-mobile.component';

describe('ReferralsMobileComponent', () => {
  let component: ReferralsMobileComponent;
  let fixture: ComponentFixture<ReferralsMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferralsMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReferralsMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
