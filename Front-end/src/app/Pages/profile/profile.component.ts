import { Component, OnInit } from '@angular/core'
import { enableRipple } from '@syncfusion/ej2-base';
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

}
