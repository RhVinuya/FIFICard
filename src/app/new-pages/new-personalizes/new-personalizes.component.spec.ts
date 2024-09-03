import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPersonalizesComponent } from './new-personalizes.component';

describe('NewPersonalizesComponent', () => {
  let component: NewPersonalizesComponent;
  let fixture: ComponentFixture<NewPersonalizesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPersonalizesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewPersonalizesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
