import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalizeMobileComponent } from './personalize-mobile.component';

describe('PersonalizeMobileComponent', () => {
  let component: PersonalizeMobileComponent;
  let fixture: ComponentFixture<PersonalizeMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalizeMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalizeMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
