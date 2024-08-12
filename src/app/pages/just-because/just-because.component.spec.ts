import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JustBecauseComponent } from './just-because.component';

describe('JustBecauseComponent', () => {
  let component: JustBecauseComponent;
  let fixture: ComponentFixture<JustBecauseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JustBecauseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JustBecauseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
