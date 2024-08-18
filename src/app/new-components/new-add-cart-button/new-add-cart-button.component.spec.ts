import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAddCartButtonComponent } from './new-add-cart-button.component';

describe('NewAddCartButtonComponent', () => {
  let component: NewAddCartButtonComponent;
  let fixture: ComponentFixture<NewAddCartButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewAddCartButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewAddCartButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
