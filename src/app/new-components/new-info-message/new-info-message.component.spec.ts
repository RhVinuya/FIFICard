import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewInfoMessageComponent } from './new-info-message.component';

describe('NewInfoMessageComponent', () => {
  let component: NewInfoMessageComponent;
  let fixture: ComponentFixture<NewInfoMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewInfoMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewInfoMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
