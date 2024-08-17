import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewContactUsComponent } from './new-contact-us.component';

describe('NewContactUsComponent', () => {
  let component: NewContactUsComponent;
  let fixture: ComponentFixture<NewContactUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewContactUsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewContactUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
