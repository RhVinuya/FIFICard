import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRegistrationCompleteComponent } from './new-registration-complete.component';

describe('NewRegistrationCompleteComponent', () => {
  let component: NewRegistrationCompleteComponent;
  let fixture: ComponentFixture<NewRegistrationCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewRegistrationCompleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewRegistrationCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
