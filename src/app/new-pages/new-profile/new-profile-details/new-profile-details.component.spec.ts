import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProfileDetailsComponent } from './new-profile-details.component';

describe('NewProfileDetailsComponent', () => {
  let component: NewProfileDetailsComponent;
  let fixture: ComponentFixture<NewProfileDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewProfileDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewProfileDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
