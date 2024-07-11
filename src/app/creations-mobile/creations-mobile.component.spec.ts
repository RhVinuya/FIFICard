import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationsMobileComponent } from './creations-mobile.component';

describe('CreationsMobileComponent', () => {
  let component: CreationsMobileComponent;
  let fixture: ComponentFixture<CreationsMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreationsMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreationsMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
