import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClipartComponent } from './clipart.component';

describe('ClipartComponent', () => {
  let component: ClipartComponent;
  let fixture: ComponentFixture<ClipartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClipartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClipartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
