import { Component, OnInit } from '@angular/core';
import { AlertsService } from 'src/app/Services/alerts.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private alerts:AlertsService) { }

  ngOnInit(): void {
    
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
