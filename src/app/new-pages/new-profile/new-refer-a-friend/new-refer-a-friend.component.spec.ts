import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewReferAFriendComponent } from './new-refer-a-friend.component';

describe('NewReferAFriendComponent', () => {
  let component: NewReferAFriendComponent;
  let fixture: ComponentFixture<NewReferAFriendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewReferAFriendComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewReferAFriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
