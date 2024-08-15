import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLayoutPostcardsComponent } from './new-layout-postcards.component';

describe('NewLayoutPostcardsComponent', () => {
  let component: NewLayoutPostcardsComponent;
  let fixture: ComponentFixture<NewLayoutPostcardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewLayoutPostcardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewLayoutPostcardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
