import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraduationGreetingsComponent } from './graduation-greetings.component';

describe('GraduationGreetingsComponent', () => {
  let component: GraduationGreetingsComponent;
  let fixture: ComponentFixture<GraduationGreetingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraduationGreetingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraduationGreetingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
