import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MothersDayComponent } from './mothers-day.component';

describe('MothersDayComponent', () => {
  let component: MothersDayComponent;
  let fixture: ComponentFixture<MothersDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MothersDayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MothersDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
