import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewInYourCartComponent } from './new-in-your-cart.component';

describe('NewInYourCartComponent', () => {
  let component: NewInYourCartComponent;
  let fixture: ComponentFixture<NewInYourCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewInYourCartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewInYourCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
