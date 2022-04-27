import { Component, OnInit } from '@angular/core';
import { enableRipple } from '@syncfusion/ej2-base';
import Swal from 'sweetalert2'
enableRipple(true);
import { TimePicker } from '@syncfusion/ej2-calendars';
import { UserService } from 'src/app/Services/user.service';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { BookingService } from 'src/app/Services/booking.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { timestamp } from 'rxjs/operators';


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

  dateValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (control?.value) {
        const today = new Date();
        const dateToCheck = new Date(control.value);
        if (dateToCheck < today) {
            return {'Invalid date': true}
        }
    }
    return null;
}

  constructor(private userService: UserService, private bookingService: BookingService,private activatedRoute:ActivatedRoute, private router: Router, private authService: AuthService) {
    // this.Interpreter=this.router.getCurrentNavigation().extras.state?this.router.getCurrentNavigation().extras.state.int:null;

  }



  ngOnInit(): void {
    let todayDate = Date.now();
    console.log(todayDate );
  // this.Interpreter = JSON.parse(localStorage.getItem('user'));
  this.Interpreter =   JSON.parse(localStorage.getItem("Interpreter"));
  console.log(this.Interpreter);
  
    // this.activatedRoute.params.subscribe(params => {
    //   console.log("obj",params);
    //   this.Interpreter = params;
    //   this.intepreterID = this.Interpreter.id;
      
    //   //this.router.navigate['/clientbooking'];
    // });

   console.log(this.Interpreter.email);
   

    this.bookingForm = new FormGroup({
      date_: new FormControl('', [Validators.required,this.dateValidator]),
      time_: new FormControl('', [Validators.required])
    });
    this.userLogged = this.authService.getUser();
   console.log(this.userLogged.role);

   this.isclientLoggedIn=this.userLogged.role === 'CLIENT'?true:false;

    this.intepreterID = this.userService.getUser();
    console.log("interId",this.intepreterID.id)
    // console.log(this.intepreterID);
    localStorage.setItem("intepreterID",this.intepreterID);

    let token = localStorage.getItem("auth-token");
    this.bookingService.getAllbookingSlot(token,this.intepreterID.id)
    .subscribe(res =>{
      res.forEach(element => {
        
      });
      
    })
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

 
  async creatBooking() {
    this.activatedRoute.params.subscribe(params => {
      // console.log(params);
      this.Interpreter = params;
      this.intepreterID = this.Interpreter.id;
      console.log(this.intepreterID);
      
      this.router.navigate['/clientbooking'];
    });
    var id = localStorage.getItem("intepreterID")
    let todayDate = Date.now();
    console.log(todayDate );
    let timeStamp = timestamp
    
    this.data = {
      intepreterID: parseInt(id),
      date_: this.bookingForm.value.date_,
      time_: this.bookingForm.value.time_,
      status: null
    }
    console.log(this.data);

    let token = localStorage.getItem("auth-token");
    
    this.bookingService.getAllbookingSlot(token,id)
    .subscribe(res =>{
       res.forEach(element => {
        console.log(element);
        
         if((this.bookingForm.value.date_ === element.date_) && (this.bookingForm.value.time_ === element.time_)){
          Swal.fire(
            {
              icon: 'error',
              title: "Slot Already taken",
              showConfirmButton: false,
              timer: 1900,
               width: '300px'
            }
          ) 
        }
        else{
          this.bookingService.booking(this.data,token)
          .subscribe(res =>{
            this.simpleAlert();
          },error =>{
            console.log(error);
            
          })

        }
      });
      
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


  bookingSlot(){
    let token = localStorage.getItem("auth-token");

     this.bookingService.getAllbookingSlot(token,this.intepreterID.id)
    .subscribe(res =>{
      res.forEach(element => {
        if((this.bookingForm.value.date_ === element.date_) && (this.bookingForm.value.time_ === element.time_)){
          return true
        }
        else{
          return false;
        }
      });
      
    })
   
  }

}
// function isInterpreter() {
//   throw new Error('Function not implemented.');
// }

// function isInterpreter() {
//   throw new Error('Function not implemented.');
// }

