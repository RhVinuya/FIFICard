import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewConfirmMessageComponent } from './new-confirm-message.component';

describe('NewConfirmMessageComponent', () => {
  let component: NewConfirmMessageComponent;
  let fixture: ComponentFixture<NewConfirmMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewConfirmMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewConfirmMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
