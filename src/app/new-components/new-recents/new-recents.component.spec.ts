import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRecentsComponent } from './new-recents.component';

describe('NewRecentsComponent', () => {
  let component: NewRecentsComponent;
  let fixture: ComponentFixture<NewRecentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewRecentsComponent]
    });
    fixture = TestBed.createComponent(NewRecentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
