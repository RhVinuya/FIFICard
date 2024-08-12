import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignAndSendCardsComponent } from './sign-and-send-cards.component';

describe('SignAndSendCardsComponent', () => {
  let component: SignAndSendCardsComponent;
  let fixture: ComponentFixture<SignAndSendCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignAndSendCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignAndSendCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
