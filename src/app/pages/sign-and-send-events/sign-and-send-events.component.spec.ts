import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignAndSendEventsComponent } from './sign-and-send-events.component';

describe('SignAndSendEventsComponent', () => {
  let component: SignAndSendEventsComponent;
  let fixture: ComponentFixture<SignAndSendEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignAndSendEventsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignAndSendEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
