import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCommunicationComponent } from './profile-communication.component';

describe('ProfileCommunicationComponent', () => {
  let component: ProfileCommunicationComponent;
  let fixture: ComponentFixture<ProfileCommunicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileCommunicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileCommunicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
