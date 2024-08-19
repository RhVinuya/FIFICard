import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewChatNowComponent } from './new-chat-now.component';

describe('NewChatNowComponent', () => {
  let component: NewChatNowComponent;
  let fixture: ComponentFixture<NewChatNowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewChatNowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewChatNowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
