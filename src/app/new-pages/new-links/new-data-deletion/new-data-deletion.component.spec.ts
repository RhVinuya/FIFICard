import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDataDeletionComponent } from './new-data-deletion.component';

describe('NewDataDeletionComponent', () => {
  let component: NewDataDeletionComponent;
  let fixture: ComponentFixture<NewDataDeletionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewDataDeletionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewDataDeletionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
