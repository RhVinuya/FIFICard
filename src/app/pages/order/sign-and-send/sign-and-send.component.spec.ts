import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignAndSendComponent } from './sign-and-send.component';

describe('SignAndSendComponent', () => {
  let component: SignAndSendComponent;
  let fixture: ComponentFixture<SignAndSendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignAndSendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignAndSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
