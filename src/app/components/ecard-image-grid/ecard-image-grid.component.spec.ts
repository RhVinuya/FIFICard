import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ECardImageGridComponent } from './ecard-image-grid.component';

describe('ECardImageGridComponent', () => {
  let component: ECardImageGridComponent;
  let fixture: ComponentFixture<ECardImageGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ECardImageGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ECardImageGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
