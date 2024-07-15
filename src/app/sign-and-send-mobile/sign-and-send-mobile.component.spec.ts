import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignAndSendMobileComponent } from './sign-and-send-mobile.component';

describe('SignAndSendMobileComponent', () => {
  let component: SignAndSendMobileComponent;
  let fixture: ComponentFixture<SignAndSendMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignAndSendMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignAndSendMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
