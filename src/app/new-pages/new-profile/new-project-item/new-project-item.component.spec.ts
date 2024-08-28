import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProjectItemComponent } from './new-project-item.component';

describe('NewProjectItemComponent', () => {
  let component: NewProjectItemComponent;
  let fixture: ComponentFixture<NewProjectItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewProjectItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewProjectItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
