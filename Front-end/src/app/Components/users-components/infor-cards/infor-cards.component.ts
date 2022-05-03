import { error } from '@angular/compiler/src/util';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-infor-cards',
  templateUrl: './infor-cards.component.html',
  styleUrls: ['./infor-cards.component.scss']
})
export class InforCardsComponent implements OnInit {

  @Input() user: any;
  intepreterID: any;
  userLogged:any;
  isintepreterLoggedIn:boolean;
  file: any = '';

  editForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    hourly_rate: new FormControl(''),
    langID: new FormControl(''),
    images: new FormControl(''),

  });

  constructor(private userService: UserService, private activatedRoute:ActivatedRoute, private authService:AuthService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
     console.log(this.user);
      
    this.getClient();
    this.userLogged = this.authService.getUser()
    console.log(this.userLogged.role);
 
    this.isintepreterLoggedIn = this.userLogged.role === 'CLIENT'? false :true;

    this.editForm = this.formBuilder.group({
      name: [''],
      lastname: [''],
      hourly_rate: [''],
      langID: [''],
      images: [''],
    })
 
    this.interpreterEdit();
  }
  submit(): void{
    const formData = new FormData()
    formData.append('images', this.file)
    formData.append('name', this.editForm.value.name);
    formData.append('lastname',this.editForm.value.lastname);
    formData.append('hourly_rate',this.editForm.value.hourly_rate);
    

    console.log(formData);
    
    console.log(formData.get("langID"));
    let token = localStorage.getItem("auth-token");
    this.userService.updateIntepreter(formData, token)
    .subscribe({
      next: (response) => console.log(response),
      error: (error)=> console.log(error),
    })
  }


  getClient(){
    
    
    // this.activatedRoute.params.subscribe(params => {
    //   console.log(params);
    //   this.user = params;
    //   console.log(this.user);
    // });

    //this.user = localStorage.getItem("user");
    this.intepreterID = this.user.id
    localStorage.setItem("intepreterID",this.intepreterID);

    console.log(this.user);
    
  }

  interpreterEdit(){
    let token = localStorage.getItem("auth-token");
    console.log(token);
    console.log(this.editForm.value);
    
    
    // this.userService.updateIntepreter(this.user, token).subscribe(res=>{
    //  console.log(res) 
    // }, error =>{
    //   console.log(error);
    // })
  }
  selectThisImage(myEvent: any) {
    this.file = myEvent.target.files[0]; 
  }

}
