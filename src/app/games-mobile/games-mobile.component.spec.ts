import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesMobileComponent } from './games-mobile.component';

describe('GamesMobileComponent', () => {
  let component: GamesMobileComponent;
  let fixture: ComponentFixture<GamesMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamesMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamesMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
