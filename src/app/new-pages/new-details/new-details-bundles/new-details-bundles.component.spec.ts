import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDetailsBundlesComponent } from './new-details-bundles.component';

describe('NewDetailsBundlesComponent', () => {
  let component: NewDetailsBundlesComponent;
  let fixture: ComponentFixture<NewDetailsBundlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewDetailsBundlesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewDetailsBundlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
