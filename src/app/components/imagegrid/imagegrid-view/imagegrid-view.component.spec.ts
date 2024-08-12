import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagegridViewComponent } from './imagegrid-view.component';

describe('ImagegridViewComponent', () => {
  let component: ImagegridViewComponent;
  let fixture: ComponentFixture<ImagegridViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImagegridViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagegridViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
