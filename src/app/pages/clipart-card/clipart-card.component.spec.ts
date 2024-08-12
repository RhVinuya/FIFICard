import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClipartCardComponent } from './clipart-card.component';

describe('ClipartCardComponent', () => {
  let component: ClipartCardComponent;
  let fixture: ComponentFixture<ClipartCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClipartCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClipartCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
