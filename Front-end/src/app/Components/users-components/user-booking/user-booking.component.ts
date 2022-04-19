import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/Services/booking.service';

@Component({
  selector: 'app-user-booking',
  templateUrl: './user-booking.component.html',
  styleUrls: ['./user-booking.component.scss']
})
export class UserBookingComponent implements OnInit {

  bookings: any;
  token: any;
  constructor(private bookingService: BookingService) { }

  ngOnInit(): void {
    this.token = localStorage.getItem("auth-token");
    console.log(this.token);
  }

  getBookings() {
    this.bookingService.getAllclientbooking(this.token)
    .subscribe(res =>{
      console.log(res);
    })
  }

}
