import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ECardsPageComponent } from './e-cards-page.component';

describe('ECardsPageComponent', () => {
  let component: ECardsPageComponent;
  let fixture: ComponentFixture<ECardsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ECardsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ECardsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
