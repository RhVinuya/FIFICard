import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSignAndSendComponent } from './new-sign-and-send.component';

describe('NewSignAndSendComponent', () => {
  let component: NewSignAndSendComponent;
  let fixture: ComponentFixture<NewSignAndSendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewSignAndSendComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewSignAndSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
