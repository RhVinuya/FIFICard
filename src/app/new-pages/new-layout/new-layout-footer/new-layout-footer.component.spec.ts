import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLayoutFooterComponent } from './new-layout-footer.component';

describe('NewLayoutFooterComponent', () => {
  let component: NewLayoutFooterComponent;
  let fixture: ComponentFixture<NewLayoutFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewLayoutFooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewLayoutFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
