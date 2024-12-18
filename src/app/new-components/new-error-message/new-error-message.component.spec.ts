import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewErrorMessageComponent } from './new-error-message.component';

describe('NewErrorMessageComponent', () => {
  let component: NewErrorMessageComponent;
  let fixture: ComponentFixture<NewErrorMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewErrorMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewErrorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
