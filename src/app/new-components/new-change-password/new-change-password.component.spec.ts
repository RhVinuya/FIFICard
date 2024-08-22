import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewChangePasswordComponent } from './new-change-password.component';

describe('NewChangePasswordComponent', () => {
  let component: NewChangePasswordComponent;
  let fixture: ComponentFixture<NewChangePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewChangePasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
