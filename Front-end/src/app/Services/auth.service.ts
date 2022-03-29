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

  register(newUser: newUser): Observable<any> {
    return this.http
    .post<any>("localhost:8081/register", newUser
    // newUser
    // this.httpOptions,
    )
    .pipe(take(1));

    console.log(newUser);
  }
}

