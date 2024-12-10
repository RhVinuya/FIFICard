import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingMobileComponent } from './onboarding-mobile.component';

describe('OnboardingMobileComponent', () => {
  let component: OnboardingMobileComponent;
  let fixture: ComponentFixture<OnboardingMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardingMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnboardingMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
