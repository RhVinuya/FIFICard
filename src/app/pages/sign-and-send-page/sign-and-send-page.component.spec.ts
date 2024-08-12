import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignAndSendPageComponent } from './sign-and-send-page.component';

describe('SignAndSendPageComponent', () => {
  let component: SignAndSendPageComponent;
  let fixture: ComponentFixture<SignAndSendPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignAndSendPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignAndSendPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
