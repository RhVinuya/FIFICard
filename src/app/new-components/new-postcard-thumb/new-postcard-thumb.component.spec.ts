import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPostcardThumbComponent } from './new-postcard-thumb.component';

describe('NewPostcardThumbComponent', () => {
  let component: NewPostcardThumbComponent;
  let fixture: ComponentFixture<NewPostcardThumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPostcardThumbComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewPostcardThumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
