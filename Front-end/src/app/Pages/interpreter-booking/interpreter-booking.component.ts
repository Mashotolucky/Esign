import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-interpreter-booking',
  templateUrl: './interpreter-booking.component.html',
  styleUrls: ['./interpreter-booking.component.scss']
})
export class InterpreterBookingComponent implements OnInit {
  select = ' ';
  count = 0;
 
 
 
  constructor() { }




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

    this.select = user_type;
    let color = document.querySelector(`#${user_type}`);
    console.log(color);

    if(color != null){
      color?.classList.toggle('btnColor');
    } 
  }

  

}
