import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRecentItemComponent } from './new-recent-item.component';

describe('NewRecentItemComponent', () => {
  let component: NewRecentItemComponent;
  let fixture: ComponentFixture<NewRecentItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewRecentItemComponent]
    });
    fixture = TestBed.createComponent(NewRecentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
