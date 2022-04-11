import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/login.service';
import swal from "sweetalert2";
import { UserService } from 'src/app/Services/user.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({})
  
  status: boolean;

  
  

  constructor(private fb:FormBuilder, private router: Router, private loginService: LoginService, private onlineService: UserService) {}
  ngOnInit(): void{
    this.form = this.fb.group({
      email:  new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    })
  }

  onSubmit(){
  console.log(this.form.value);
  
    this.loginService.login(this.form.value).subscribe(
      {next: res => {
      if (res == null){
        this.router.navigate(['/register']);
        return //this.toastr.error("somthing went wrong");
      }
      var myobject:any={
        token:"",user:{}
      };
      myobject=res;
      if (myobject){
        localStorage.setItem("auth-token",myobject.token); 
        if(myobject.user.role==="CLIENT"){  
            return this.router.navigate(['/']);
        }else if (myobject.user.role==="INTEPRETER"){
           // set the online_status true

           let data = {status: true};

           console.log(data);
           const token=localStorage.getItem("auth-token");
           this.onlineService.setOniline(data,token)
           .subscribe(res =>{
             console.log("online",res);
            
           })
      
           //emit event 
            return this.router.navigate(['/interpreterbooking']);
        }
      }
        return 1;
    },
error: err => {

    swal.fire(
      {
        icon: 'error',
        title: err.error.message,
        showConfirmButton: false,
        timer: 1900,
         width: '300px'
      }
    ) 
}})
  

  }

  get f()
  {
    return this.form.controls;
  }

  submit()
  {
    //console.log(this.form.value);
  }


  get email() 
  {
    return this.form.get('email');

  }

  get password() 
  {
    return this.form.get('password');
  }
   

}
