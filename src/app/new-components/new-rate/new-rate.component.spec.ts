import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRateComponent } from './new-rate.component';

describe('NewRateComponent', () => {
  let component: NewRateComponent;
  let fixture: ComponentFixture<NewRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewRateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
