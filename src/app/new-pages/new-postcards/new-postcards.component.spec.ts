import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPostcardsComponent } from './new-postcards.component';

describe('NewPostcardsComponent', () => {
  let component: NewPostcardsComponent;
  let fixture: ComponentFixture<NewPostcardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPostcardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewPostcardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
