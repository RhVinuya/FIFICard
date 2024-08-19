import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEventsOptionsComponent } from './new-events-options.component';

describe('NewEventsOptionsComponent', () => {
  let component: NewEventsOptionsComponent;
  let fixture: ComponentFixture<NewEventsOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewEventsOptionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewEventsOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
