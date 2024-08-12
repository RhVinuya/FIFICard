import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagegridComponent } from './imagegrid.component';

describe('ImagegridComponent', () => {
  let component: ImagegridComponent;
  let fixture: ComponentFixture<ImagegridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImagegridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagegridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
