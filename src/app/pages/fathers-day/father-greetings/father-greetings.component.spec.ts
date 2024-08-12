import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FatherGreetingsComponent } from './father-greetings.component';

describe('FatherGreetingsComponent', () => {
  let component: FatherGreetingsComponent;
  let fixture: ComponentFixture<FatherGreetingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FatherGreetingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FatherGreetingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
