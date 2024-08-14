import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCardsComponent } from './new-cards.component';

describe('NewCardsComponent', () => {
  let component: NewCardsComponent;
  let fixture: ComponentFixture<NewCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
