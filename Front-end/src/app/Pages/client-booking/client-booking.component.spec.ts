import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientBookingComponent } from './client-booking.component';

describe('ClientBookingComponent', () => {
  let component: ClientBookingComponent;
  let fixture: ComponentFixture<ClientBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientBookingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
