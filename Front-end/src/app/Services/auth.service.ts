import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import { newUser } from '../Models/newUser';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import { User } from '../Models/User';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient
  //   , private httpOptions: {headers: HttpHeaders} = {
  //   headers: new HttpHeaders({})
  // }
  ) { }

  isLoggedIn() {

    //get token from local storage
    const token = localStorage.getItem('auth-token');

    //decode payload of the token
    const payload = atob(token.split('.')[1]);
    console.log(token);

    //Convert payload. into an Object
    const parsedPayload = JSON.parse(payload);
    console.log(parsedPayload);

    return parsedPayload.exp > Date.now()/1000;
    
    
  }
}

