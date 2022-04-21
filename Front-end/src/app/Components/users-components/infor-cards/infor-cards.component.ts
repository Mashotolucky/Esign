import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-infor-cards',
  templateUrl: './infor-cards.component.html',
  styleUrls: ['./infor-cards.component.scss']
})
export class InforCardsComponent implements OnInit {
 editForm: FormGroup;
  user: any;
  intepreterID: any;

  constructor(private userService: UserService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.getClient();

    this.editForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
    });
  }

  getClient(){
    
    this.activatedRoute.params.subscribe(params => {
      // console.log(params);
      this.user = params;
      this.intepreterID = this.user.id
      localStorage.setItem("intepreterID",this.intepreterID);
    });
    
  }

  interpreterEdit(){
    this.userService.updateIntepreter(this.editForm.value,this.intepreterID).subscribe(res=>{
     console.log(res) 
    }, error =>{
      console.log(error);
      
    })
  }



}
