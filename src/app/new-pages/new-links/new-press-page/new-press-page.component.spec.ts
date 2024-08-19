import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPressPageComponent } from './new-press-page.component';

describe('NewPressPageComponent', () => {
  let component: NewPressPageComponent;
  let fixture: ComponentFixture<NewPressPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPressPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewPressPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
