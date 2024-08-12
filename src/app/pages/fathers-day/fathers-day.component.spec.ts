import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FathersDayComponent } from './fathers-day.component';

describe('FathersDayComponent', () => {
  let component: FathersDayComponent;
  let fixture: ComponentFixture<FathersDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FathersDayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FathersDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
