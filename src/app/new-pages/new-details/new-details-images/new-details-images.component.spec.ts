import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDetailsImagesComponent } from './new-details-images.component';

describe('NewDetailsImagesComponent', () => {
  let component: NewDetailsImagesComponent;
  let fixture: ComponentFixture<NewDetailsImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewDetailsImagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewDetailsImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
