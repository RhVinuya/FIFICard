import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLayoutHeaderComponent } from './new-layout-header.component';

describe('NewLayoutHeaderComponent', () => {
  let component: NewLayoutHeaderComponent;
  let fixture: ComponentFixture<NewLayoutHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewLayoutHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewLayoutHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
