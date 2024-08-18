import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCardEventsComponent } from './new-card-events.component';

describe('NewCardEventsComponent', () => {
  let component: NewCardEventsComponent;
  let fixture: ComponentFixture<NewCardEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCardEventsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewCardEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
