import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDetailsMobileComponent } from './profile-details-mobile.component';

describe('ProfileDetailsMobileComponent', () => {
  let component: ProfileDetailsMobileComponent;
  let fixture: ComponentFixture<ProfileDetailsMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileDetailsMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileDetailsMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
