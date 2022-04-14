import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-infor-cards',
  templateUrl: './infor-cards.component.html',
  styleUrls: ['./infor-cards.component.scss']
})
export class InforCardsComponent implements OnInit {

  user: any;
  intepreterID: any;

  constructor(private userService: UserService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.getClient();
  }

  getClient(){
    
    this.activatedRoute.params.subscribe(params => {
      // console.log(params);
      this.user = params;
      this.intepreterID = this.user.id
      localStorage.setItem("intepreterID",this.intepreterID);
    });
    
  }



}
