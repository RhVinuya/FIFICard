import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HalloweenGreetingsComponent } from './halloween-greetings.component';

describe('HalloweenGreetingsComponent', () => {
  let component: HalloweenGreetingsComponent;
  let fixture: ComponentFixture<HalloweenGreetingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HalloweenGreetingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HalloweenGreetingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
