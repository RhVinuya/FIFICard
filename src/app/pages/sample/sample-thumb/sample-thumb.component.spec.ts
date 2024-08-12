import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleThumbComponent } from './sample-thumb.component';

describe('SampleThumbComponent', () => {
  let component: SampleThumbComponent;
  let fixture: ComponentFixture<SampleThumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SampleThumbComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SampleThumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
