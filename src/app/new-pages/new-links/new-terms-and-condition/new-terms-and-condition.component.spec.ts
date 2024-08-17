import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTermsAndConditionComponent } from './new-terms-and-condition.component';

describe('NewTermsAndConditionComponent', () => {
  let component: NewTermsAndConditionComponent;
  let fixture: ComponentFixture<NewTermsAndConditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewTermsAndConditionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewTermsAndConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
