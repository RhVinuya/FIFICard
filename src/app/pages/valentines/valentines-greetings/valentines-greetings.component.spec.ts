import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValentinesGreetingsComponent } from './valentines-greetings.component';

describe('ValentinesGreetingsComponent', () => {
  let component: ValentinesGreetingsComponent;
  let fixture: ComponentFixture<ValentinesGreetingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValentinesGreetingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValentinesGreetingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
