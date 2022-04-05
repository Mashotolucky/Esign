import { Component, OnInit } from '@angular/core';
import { AlertsService } from 'src/app/Services/alerts.service';
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(true);
import { TimePicker } from '@syncfusion/ej2-calendars';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private alerts:AlertsService) { }

  

  ngOnInit(): void {
  //   let timeObj: TimePicker = new TimePicker({ step:45, placeholder: 'Select a time'
  // });
  // timeObj.appendTo('#timepicker');
  }

  simpleAlert(){
    this.alerts.success("hi i am successful");
  }

  alertWithSuccess(){
    this.alerts.warning("Hi i am a warning alert")
  }

  confirmBox(){
    this.alerts.danger("hi i am a danger alert")
  }


}
