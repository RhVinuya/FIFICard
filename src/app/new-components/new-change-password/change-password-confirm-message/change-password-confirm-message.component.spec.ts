import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordConfirmMessageComponent } from './change-password-confirm-message.component';

describe('ChangePasswordConfirmMessageComponent', () => {
  let component: ChangePasswordConfirmMessageComponent;
  let fixture: ComponentFixture<ChangePasswordConfirmMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangePasswordConfirmMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangePasswordConfirmMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
