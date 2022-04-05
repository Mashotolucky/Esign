import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import { FileuploadserviceService } from 'src/app/Services/fileuploadservice.service';
import { RegisterService } from 'src/app/Services/register.service';

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

  file: any = '';
  spinnerState:boolean=false;

  constructor(private fb : FormBuilder
    , private authService: AuthService,
    private fileuploadservice: FileuploadserviceService
    , private registerService: RegisterService
    ) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      role: new FormControl('',[Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl(''),
      confirm_password: new FormControl(''),
      file: new FormControl('')

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
      
      this.registerService.register(this.registerForm.value)
      .subscribe(res =>{
        alert("Registered!!")
        
      })
    
      console.log(this.registerForm.value)
    }  
    
    }

    selectThisImage(myEvent: any) {
      this.file = myEvent.target.files[0];
      //console.log("the file :",this.file.name);
      
    }

    uploadDocument(): void {

      this.spinnerState=true
      this.registerForm.value.file = this.file;
       console.log(this.registerForm.value.file)
   
       const formData = new FormData()
       formData.append('documents', this.file)
       console.log(formData.get('documents'));
   
       this.fileuploadservice.uploadDocument(this.registerForm.value.file).subscribe((data) => {
          console.log(data, 'uploaded');
  
          // var dat = data.toString()
          // this.document = document.createElement('document')
          // this.document.setAttribute('src', dat)
          console.log('this document')
          
          console.log(data)
          console.log('end of documents')
          this.spinnerState=false
         //  if(document.querySelector('.img-wrapper') != null ) {  
         //   document.querySelector('.img-wrapper')?.appendChild(video)
         //  }
          
       })
   
     }


}

