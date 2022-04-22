import { Component, OnInit } from '@angular/core';
import { enableRipple } from '@syncfusion/ej2-base';
import Swal from 'sweetalert2'
enableRipple(true);
import { TimePicker } from '@syncfusion/ej2-calendars';
import { UserService } from 'src/app/Services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BookingService } from 'src/app/Services/booking.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  bookingForm!: FormGroup;
  intepreterID: any;
  data: any;
  Interpreter: any;
  userLogged: any;
  isclientLoggedIn:boolean;
  constructor(private userService: UserService, private bookingService: BookingService,private activatedRoute:ActivatedRoute, private router: Router, private authService: AuthService) { }



  ngOnInit(): void {
  
    this.activatedRoute.params.subscribe(params => {
      console.log(params);
      this.Interpreter = params;
      this.intepreterID = this.Interpreter.id;
      
      //this.router.navigate['/clientbooking'];
    });



    this.bookingForm = new FormGroup({
      date_: new FormControl('', [Validators.required]),
      time_: new FormControl('', [Validators.required])
    });
    this.userLogged = this.authService.getUser()
   console.log(this.userLogged.role);

   this.isclientLoggedIn=this.userLogged.role === 'CLIENT'?true:false;

    this.intepreterID = this.userService.getUser();
    
    // console.log(this.intepreterID);
    localStorage.setItem("intepreterID",this.intepreterID);
  }


  isInterpreter(): boolean{
    if(this.userLogged.role === 'CLIENT'){
      return false
    }
    return true
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
    this.activatedRoute.params.subscribe(params => {
      // console.log(params);
      this.Interpreter = params;
      this.intepreterID = this.Interpreter.id;
      
      this.router.navigate['/clientbooking'];
    });
    var id = localStorage.getItem("intepreterID")
    this.data = {
      intepreterID: parseInt(this.intepreterID),
      date_: this.bookingForm.value.date_,
      time_: this.bookingForm.value.time_,
      status: null
    }
    console.log(this.data);

    let token = localStorage.getItem("auth-token");
    this.bookingService.booking(this.data,token)
    .subscribe(res =>{
      this.simpleAlert();
    },error =>{
      console.log(error);
      
    })

    // this.activatedRoute.params.subscribe(params => {
    //   // console.log(params);
    //   // this.Interpreter = params;
    //   this.intepreterID = this.Interpreter.id;

    //   localStorage.setItem("intepreterID",this.intepreterID);
    // });
    this.intepreterID = this.Interpreter.id;

      localStorage.setItem("intepreterID",this.intepreterID);
  }



}
// function isInterpreter() {
//   throw new Error('Function not implemented.');
// }

// function isInterpreter() {
//   throw new Error('Function not implemented.');
// }

