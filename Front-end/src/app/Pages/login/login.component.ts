import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({})
  

  constructor(private fb:FormBuilder, private router: Router, private loginService: LoginService) {}
  ngOnInit(): void{
    this.form = this.fb.group({
      email:  new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    })
  }

  onSubmit(form: FormGroup){
    console.log(form);
    console.log('hello')
    console.log('valid?',form.valid);
    console.log('password',form.value.password);
    console.log('email',form.value.email);
  
  }

  get f()
  {
    return this.form.controls;
  }

  submit()
  {
    console.log(this.form.value);

    this.loginService.login(this.form.value)
    .subscribe(res =>{
      console.log(res);
      
    })
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
