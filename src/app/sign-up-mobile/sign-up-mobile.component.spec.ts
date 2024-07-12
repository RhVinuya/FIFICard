import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpMobileComponent } from './sign-up-mobile.component';

describe('SignUpMobileComponent', () => {
  let component: SignUpMobileComponent;
  let fixture: ComponentFixture<SignUpMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignUpMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
