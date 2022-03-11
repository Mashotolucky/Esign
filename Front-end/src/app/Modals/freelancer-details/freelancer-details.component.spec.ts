import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancerDetailsComponent } from './freelancer-details.component';

describe('FreelancerDetailsComponent', () => {
  let component: FreelancerDetailsComponent;
  let fixture: ComponentFixture<FreelancerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreelancerDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FreelancerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
