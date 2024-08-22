import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewChangeEmailComponent } from './new-change-email.component';

describe('NewChangeEmailComponent', () => {
  let component: NewChangeEmailComponent;
  let fixture: ComponentFixture<NewChangeEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewChangeEmailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewChangeEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
