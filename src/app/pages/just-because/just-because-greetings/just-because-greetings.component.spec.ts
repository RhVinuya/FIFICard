import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JustBecauseGreetingsComponent } from './just-because-greetings.component';

describe('JustBecauseGreetingsComponent', () => {
  let component: JustBecauseGreetingsComponent;
  let fixture: ComponentFixture<JustBecauseGreetingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JustBecauseGreetingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JustBecauseGreetingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
