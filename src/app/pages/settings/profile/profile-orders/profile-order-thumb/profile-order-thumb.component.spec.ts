import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileOrderThumbComponent } from './profile-order-thumb.component';

describe('ProfileOrderThumbComponent', () => {
  let component: ProfileOrderThumbComponent;
  let fixture: ComponentFixture<ProfileOrderThumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileOrderThumbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileOrderThumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
