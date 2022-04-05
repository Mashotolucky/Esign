import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl = 'http://localhost:4000/api/v1/auth/login';
  constructor(private http: HttpClient) { }

  login(data: any){
    return this.http.post(this.baseUrl,data);
  }
}
