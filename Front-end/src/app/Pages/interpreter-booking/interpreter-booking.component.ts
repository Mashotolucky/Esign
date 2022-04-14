import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/Services/booking.service';

@Component({
  selector: 'app-interpreter-booking',
  templateUrl: './interpreter-booking.component.html',
  styleUrls: ['./interpreter-booking.component.scss']
})
export class InterpreterBookingComponent implements OnInit {
  select = ' ';
  count = 0;
  bookings=false;
  streams=false;
  history=false;
  
  public boookings=[
    {"name":"lindo", "lastname":"acamia", "date":"11 April 2022", "time":"08:10 AM",}
  ];

  public streamss=[
    {"name":"lahlie", "lastname":"momo", "date":"14 April 2022", "time":"09:10 AM",}
  ];

  public historyss=[
    {"name":"Mash", "lastname":"mashy", "date":"10 April 2022", "time":"11:11 AM",}
  ];


  
  constructor(private bookingsService:BookingService) { }




  ngOnInit(): void {
    // let token = localStorage.getItem("auth-token");
    // console.log(token);
    
    //  this.bookingService.getAllbooking(token)
    //  .subscribe(res =>{
       
       
    //    this.bookings = res;
    //  })

    // console.log(this.bookings);  
  }


  changeUser_Type(user_type : string): void {

    //this.select = user_type;
    if(user_type=="bookings"){
      //fetch token from seesion or localstorage
      const token=localStorage.getItem("auth-token")
      
      //call bookings service
      this.bookingsService.getAllbooking(token).subscribe({
        next:(results)=>{
         
        },
        error:(error)=>{
         // this.bookings=false;
        }
      });

      //assign bookings array 
    }

    if(user_type=="streams"){
      //fetch token from seesion or localstorage
      const token=localStorage.getItem("auth-token")
      
      //call bookings service
      this.bookingsService.getAllinterpreterstreams(token).subscribe({
        next:(results)=>{
         
        },
        error:(error)=>{
         // this.streams=false;
        }
      });

      //assign bookings array 
    }

    if(user_type=="history"){
      //fetch token from seesion or localstorage
      const token=localStorage.getItem("auth-token")
      
      //call bookings service
      this.bookingsService.getAllinterpreterhistory(token).subscribe({
        next:(results)=>{
         
        },
        error:(error)=>{
         // this.streams=false;
        }
      });

      //assign bookings array 
    }


    switch(user_type){
      case "streams":
        this.bookings=false;
        this.streams=true;
        this.history=false;
        break;
      case "bookings":
        this.bookings=true;
        this.streams=false;
        this.history=false;
        break;
      case "history":
        this.bookings=false;
        this.streams=false;
        this.history=true;
        break;

    }


    let color = document.querySelector(`#${user_type}`);
    console.log(color);

    if(color != null){
      if(user_type == 'history'){
        
      }
    } 
  }

  

}
