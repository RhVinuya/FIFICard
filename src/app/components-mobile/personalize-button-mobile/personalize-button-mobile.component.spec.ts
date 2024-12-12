import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalizeButtonMobileComponent } from './personalize-button-mobile.component';

describe('PersonalizeButtonMobileComponent', () => {
  let component: PersonalizeButtonMobileComponent;
  let fixture: ComponentFixture<PersonalizeButtonMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalizeButtonMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalizeButtonMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
