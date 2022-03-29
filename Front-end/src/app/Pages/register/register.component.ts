import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { UserService } from 'src/app/Services/user.service';


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

  constructor(private fb : FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl(''),
      confirm_password: new FormControl('')

  });
  this.message();
  }
  fieldsWithData(): boolean{
    if((this.registerForm.value.firstName && this.registerForm.value.lastName) && (this.registerForm.value.email && this.registerForm.value.password) && (this.registerForm.value.confirm_password) != "" ){
      // this.messages();
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
  submit(): void{
    // return console.log(this.myForm.value)
    if(this.passwordMatch()) {
      this.messages();
      // this.userService.register(this.registerForm.value)
      // .subscribe(res => {
      //   alert("Successfully registered!!");
      //   window.location.href = "/login";
      //     sessionStorage.setItem("user_id", JSON.stringify(res));
      //   console.log(res)
      // }, err =>{
      //   alert(err+ "Login failed check console");
        
      // });
      console.log(this.registerForm.value)
    }  
    
    }



}

