import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewReferAFriendModalComponent } from './new-refer-a-friend-modal.component';

describe('NewReferAFriendModalComponent', () => {
  let component: NewReferAFriendModalComponent;
  let fixture: ComponentFixture<NewReferAFriendModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewReferAFriendModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewReferAFriendModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
