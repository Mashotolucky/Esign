import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import { RegisterService } from 'src/app/Services/register.service';
import {Router} from '@angular/router'; 
// import { UserService } from 'src/app/Services/user.service';
import swal from "sweetalert2";
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  haveData: boolean = false;
  message: any = '';
  isMessage: boolean = false;
  passwordMessage: any = '';
  password_matched: boolean = false;
  strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");


  file: any = '';
  spinnerState:boolean=false;

  constructor(private fb : FormBuilder,
    private registerService: RegisterService,
    private userService:UserService,
    private router:Router
    ) { }
    
  

  ngOnInit(): void {

  
    this.registerForm = new FormGroup({
      role: new FormControl('',[Validators.required]),
      name: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl(''),
      confirm_password: new FormControl(''),
      certificates: new FormControl(''),
      tagline: new FormControl(''),
      bio: new FormControl(''),
      hourly_rate: new FormControl(''),
     
  });
  }
  fieldsWithData(): boolean{
    if((this.registerForm.value.firstName && this.registerForm.value.lastName) && (this.registerForm.value.email && this.registerForm.value.password) && (this.registerForm.value.confirm_password) != "" ){
      return true;
    }
    else{
      return false;
    }
  
  }
  passwordMatch(): boolean {
    if(this.registerForm.value.confirm_password === this.registerForm.value.password){
      return true;
    }
    else{
      this.passwordMessage = "Passwords do not match";
      return false;
    }
  }
  messages(): void {
    if(this.fieldsWithData()){
      this.message = "";
    }
    else{
      this.message = "Fields cannot be empty"
    }
  }
  ifCLIENT(): Boolean{
    if(this.registerForm.value.role === "CLIENT"){
      return true;
    }
    else{
      return false;
    }
  }
  ifINTEPRETER(): Boolean{
    if(this.registerForm.value.role === "INTEPRETER"){
      return true;
    }
    else{
      return false;
    }
  }
  submit(): void{
    if(this.passwordMatch()) {
      this.messages();
      const formData = new FormData()
      formData.append('certificates', this.file)
      
      formData.append('email', this.registerForm.value.email);
      formData.append('name', this.registerForm.value.name);
      formData.append('lastname', this.registerForm.value.lastname);
      formData.append('password', this.registerForm.value.password);
      formData.append('hourly_rate', this.registerForm.value.hourly_rate);
      formData.append('bio', this.registerForm.value.bio);
      formData.append('tagline', this.registerForm.value.tagline);
      formData.append('role', this.registerForm.value.role);
     

     
      this.registerService.register(formData)
      .subscribe({
       next: res=>{

        if (res == null){
          this.router.navigate(['/register']);
          return swal.fire(
            {
              icon: 'error',
              title: "something went wrong",
              showConfirmButton: false,
              timer: 1900,
               width: '300px'
            }
          ) 
        }
        // console.log(res[0]);
           return this.router.navigate(['/login']);
       },
        error: err => {
          swal.fire(
            {
               //position: 'top-end',
              icon: 'error',
              title: err.error.message||"something went wrong",
              showConfirmButton: false,
              timer: 1900,
               width: '300px'
            }
          ) 
      }
      })
    }  
  }
     selectThisImage(myEvent: any) {
      this.file = myEvent.target.files[0]; 
    }

}

