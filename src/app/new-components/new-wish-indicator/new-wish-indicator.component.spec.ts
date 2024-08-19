import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWishIndicatorComponent } from './new-wish-indicator.component';

describe('NewWishIndicatorComponent', () => {
  let component: NewWishIndicatorComponent;
  let fixture: ComponentFixture<NewWishIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewWishIndicatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewWishIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
