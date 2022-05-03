import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

  editForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    hourly_rate: new FormControl(''),
    langID: new FormControl(''),
    images: new FormControl(''),
    bio: new  FormControl('')

  });
  constructor(private userService: UserService, private authService: AuthService,private registerService: RegisterService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getUser();

    this.editForm = this.formBuilder.group({
      name: [''],
      lastname: [''],
      hourly_rate: [''],
      langID: [''],
      images: [''],
      bio: ['']
    })
  }

  getUser(){
    this.User = JSON.parse(localStorage.getItem("user"));
    console.log(this.User);
  }

  selectThisImage(myEvent: any) {
    this.file = myEvent.target.files[0]; 
  }

  submit(): void{
    const formData = new FormData();
    formData.append('images', this.file)
    formData.append('name', this.editForm.value.name);
    formData.append('lastname',this.editForm.value.lastname);
    formData.append('hourly_rate',this.editForm.value.hourly_rate);
    formData.append('bio',this.editForm.value.hourly_rate);
    

    console.log(formData);
    
    console.log(formData.get(""));
    let token = localStorage.getItem("auth-token");
    this.userService.updateIntepreter(formData, token)
    .subscribe({
      next: (response) => console.log(response),
      error: (error)=> console.log(error),
    })
  }
}
