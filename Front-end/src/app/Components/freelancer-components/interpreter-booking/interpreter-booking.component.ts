import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/Services/booking.service';

@Component({
  selector: 'app-interpreter-booking',
  templateUrl: './interpreter-booking.component.html',
  styleUrls: ['./interpreter-booking.component.scss']
})
export class InterpreterBookingComponent implements OnInit {

  constructor(private bookingService: BookingService) { }

  bookings: any;

  ngOnInit(): void {
    let token = localStorage.getItem("auth-token");
    this.bookings = this.bookingService.getAllbooking(token);

    console.log(this.bookings);
  }

   
}
