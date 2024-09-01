import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTextareaComponent } from './new-textarea.component';

describe('NewTextareaComponent', () => {
  let component: NewTextareaComponent;
  let fixture: ComponentFixture<NewTextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewTextareaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
