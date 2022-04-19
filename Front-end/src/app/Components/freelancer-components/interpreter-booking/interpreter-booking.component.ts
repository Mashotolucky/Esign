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
  data: any;
  token: any;

  ngOnInit(): void {
    this.token = localStorage.getItem("auth-token");
    console.log(this.token);
    
    this.getClientsBookings();
   
    
  }

  getClientsBookings(){
    this.bookingService.getAllbooking(this.token)
     .subscribe(res =>{
       console.log(res);
       this.bookings = res;
       console.log(this.bookings);
       
     })
  }


  updateStatus(){
    this.bookingService.setBookingStatus(this.data)
    .subscribe(res =>{
      console.log(res);
      
    })
  }
   
}
