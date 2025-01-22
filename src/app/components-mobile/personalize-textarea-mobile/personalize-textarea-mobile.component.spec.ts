import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalizeTextareaMobileComponent } from './personalize-textarea-mobile.component';

describe('PersonalizeTextareaMobileComponent', () => {
  let component: PersonalizeTextareaMobileComponent;
  let fixture: ComponentFixture<PersonalizeTextareaMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalizeTextareaMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalizeTextareaMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
