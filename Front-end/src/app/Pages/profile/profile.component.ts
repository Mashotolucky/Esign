import { Component, OnInit } from '@angular/core';
import { enableRipple } from '@syncfusion/ej2-base';
import Swal from 'sweetalert2'
enableRipple(true);
import { TimePicker } from '@syncfusion/ej2-calendars';
import { UserService } from 'src/app/Services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BookingService } from 'src/app/Services/booking.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  bookingForm!: FormGroup;
  intepreterID: any;
  data: any;
  user: any;
  constructor(private userService: UserService, private bookingService: BookingService,private activatedRoute:ActivatedRoute) { }



  ngOnInit(): void {
    //   let timeObj: TimePicker = new TimePicker({ step:45, placeholder: 'Select a time'
    // });
    // timeObj.appendTo('#timepicker');
    this.bookingForm = new FormGroup({
      date_: new FormControl('', [Validators.required]),
      time_: new FormControl('', [Validators.required])
    });

    this.intepreterID = this.userService.getUser();
    this.intepreterID = this.intepreterID.id;
    console.log(this.intepreterID);
    localStorage.setItem("intepreterID",this.intepreterID);
  }

  simpleAlert() {
    Swal.fire({
      // position: 'top-end',
      icon: 'success',
      title: 'Successfully booked',
      showConfirmButton: false,
      timer: 1000,
      width: '300px'
    })

  }


  creatBooking(): void {
    let id = localStorage.getItem("intepreterID")
    this.data = {
      intepreterID: id,
      date_: this.bookingForm.value.date_,
      time_: this.bookingForm.value.time_,
      status: true
    }
    console.log(this.data);

    let token = localStorage.getItem("auth-token");
    this.bookingService.booking(this.data,token)
    .subscribe(res =>{
      this.simpleAlert();
    },error =>{
      console.log(error);
      
    })

    this.activatedRoute.params.subscribe(params => {
      console.log(params);
      this.user = params;

    
      

    });
    
  }



}
