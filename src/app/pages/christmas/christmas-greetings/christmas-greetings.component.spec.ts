import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChristmasGreetingsComponent } from './christmas-greetings.component';

describe('ChristmasGreetingsComponent', () => {
  let component: ChristmasGreetingsComponent;
  let fixture: ComponentFixture<ChristmasGreetingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChristmasGreetingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChristmasGreetingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
