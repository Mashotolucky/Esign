import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-infor-cards',
  templateUrl: './infor-cards.component.html',
  styleUrls: ['./infor-cards.component.scss']
})
export class InforCardsComponent implements OnInit {

  user: any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getClient();
  }

  getClient(){
    this.user = this.userService.getUser();
    console.log("info", this.user);
    
  }

}
