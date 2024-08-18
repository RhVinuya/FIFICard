import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPersonalizeButtonComponent } from './new-personalize-button.component';

describe('NewPersonalizeButtonComponent', () => {
  let component: NewPersonalizeButtonComponent;
  let fixture: ComponentFixture<NewPersonalizeButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPersonalizeButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewPersonalizeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
