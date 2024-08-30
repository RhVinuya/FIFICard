import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPasswordResetComponent } from './new-password-reset.component';

describe('NewPasswordResetComponent', () => {
  let component: NewPasswordResetComponent;
  let fixture: ComponentFixture<NewPasswordResetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPasswordResetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewPasswordResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
