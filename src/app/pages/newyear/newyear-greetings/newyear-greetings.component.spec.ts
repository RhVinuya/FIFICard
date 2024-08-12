import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewyearGreetingsComponent } from './newyear-greetings.component';

describe('NewyearGreetingsComponent', () => {
  let component: NewyearGreetingsComponent;
  let fixture: ComponentFixture<NewyearGreetingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewyearGreetingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewyearGreetingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
