import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPrivacyPolicyComponent } from './new-privacy-policy.component';

describe('NewPrivacyPolicyComponent', () => {
  let component: NewPrivacyPolicyComponent;
  let fixture: ComponentFixture<NewPrivacyPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPrivacyPolicyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewPrivacyPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
