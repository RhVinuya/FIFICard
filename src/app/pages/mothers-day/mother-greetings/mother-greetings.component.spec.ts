import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotherGreetingsComponent } from './mother-greetings.component';

describe('MotherGreetingsComponent', () => {
  let component: MotherGreetingsComponent;
  let fixture: ComponentFixture<MotherGreetingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MotherGreetingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MotherGreetingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
