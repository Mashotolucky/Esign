import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  interpretors: any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getAllIntepreters();
  }

  getAllIntepreters(): void{
    this.userService.getAllinterpreter()
    .subscribe(data =>{
      this.interpretors = data;
      console.log(data);
    })
  }

}
