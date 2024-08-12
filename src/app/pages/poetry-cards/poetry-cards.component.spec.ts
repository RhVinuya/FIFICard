import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoetryCardsComponent } from './poetry-cards.component';

describe('PoetryCardsComponent', () => {
  let component: PoetryCardsComponent;
  let fixture: ComponentFixture<PoetryCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoetryCardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoetryCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
