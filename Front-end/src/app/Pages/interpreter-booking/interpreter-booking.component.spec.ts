import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterpreterBookingComponent } from './interpreter-booking.component';

describe('InterpreterBookingComponent', () => {
  let component: InterpreterBookingComponent;
  let fixture: ComponentFixture<InterpreterBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterpreterBookingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterpreterBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
