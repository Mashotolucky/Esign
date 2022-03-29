import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import { newUser } from '../Models/newUser';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import { User } from '../Models/User';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private httpOptions: {headers: HttpHeaders} = {
    headers: new HttpHeaders({})
  }) { }

  register(newUser: newUser): Observable<User> {
    return this.http
    .post<User>(`${environment.baseUrl}/auth/register`,
    newUser,
    this.httpOptions,
    )
    .pipe(take(1));
  }
}

