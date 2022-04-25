import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookingService } from 'src/app/Services/booking.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-interpreter-booking',
  templateUrl: './interpreter-booking.component.html',
  styleUrls: ['./interpreter-booking.component.scss']
})
export class InterpreterBookingComponent implements OnInit {
  select = ' ';
  count = 0;
  bookings=true;
  streams=false;
  history=false;
  
  IntepreterBoookings : any;
  IntepreterStreams: any;

  // public streamss=[
  //   {"name":"lahlie", "lastname":"momo", "date":"14 April 2022", "time":"09:10 AM",}
  // ];

  // public historyss=[
  //   {"name":"Mash", "lastname":"mashy", "date":"10 April 2022", "time":"11:11 AM",}
  // ];


  
  constructor(private bookingsService:BookingService, private router: Router) { }




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
      this.bookingsService.getAllinterpreterbooking(token).subscribe({
        next:(results)=>{
          this.IntepreterBoookings = results;
          console.log(this.IntepreterBoookings);
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
          this.IntepreterStreams = results;
          console.log(this.IntepreterStreams);
          
        },
        error:(error)=>{
         // this.streams=false;
        }
      });

      //assign bookings array 
    }

    if(user_type=="history"){
      //fetch token from session or localstorage
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
//A switch that allows only one table to be visible when one of the buttons is being clicked

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


  
  }

  setStatus(status: boolean,id: any){
    this.bookingsService.setBookingStatus(status,id)
    .subscribe(res => {
      console.log(res);
    })
  }

  joinstream(id:any){
     if(!id) return Swal.fire({
          icon: 'error',
          title: 'can not join stream at this point',
          showConfirmButton: false,
          timer: 1000,
          width: '300px'
      })
    
   this.router.navigate(['stream',{state:{id}}])

  }

}
