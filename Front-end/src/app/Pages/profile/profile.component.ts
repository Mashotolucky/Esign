import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
=======
import { AlertsService } from 'src/app/Services/alerts.service';
>>>>>>> db310917299e8a81a9a6f443cf6ca5c44358d578
import { enableRipple } from '@syncfusion/ej2-base';
import Swal from 'sweetalert2'
enableRipple(true);
import { TimePicker } from '@syncfusion/ej2-calendars';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor() { }

  

  ngOnInit(): void {
  //   let timeObj: TimePicker = new TimePicker({ step:45, placeholder: 'Select a time'
  // });
  // timeObj.appendTo('#timepicker');
  }

  simpleAlert(){
    Swal.fire({
      // position: 'top-end',
      icon: 'success',
      title: 'Successfully booked',
      showConfirmButton: false,
      timer: 1500,
       width: '300px'
    })
    
  }




}
