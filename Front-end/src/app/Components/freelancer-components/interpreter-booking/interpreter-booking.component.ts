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
    console.log(token);
    
     this.bookingService.getAllbooking(token)
     .subscribe(res =>{
       this.bookings = res;
     })

    console.log(this.bookings);
  }

   
}
