import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { RegisterService } from 'src/app/Services/register.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  User: any;
  file: any = '';
  constructor(private userService: UserService, private authService: AuthService,private registerService: RegisterService) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    this.User = this.registerService.setInterpreter();
    console.log(this.User);
  }

  selectThisImage(myEvent: any) {
    this.file = myEvent.target.files[0]; 
  }
}
