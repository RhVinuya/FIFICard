import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignAndSendPageMobileComponent } from './sign-and-send-page-mobile.component';

describe('SignAndSendPageMobileComponent', () => {
  let component: SignAndSendPageMobileComponent;
  let fixture: ComponentFixture<SignAndSendPageMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignAndSendPageMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignAndSendPageMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
