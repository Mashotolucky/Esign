import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  baseUrl = 'http://localhost:4000/api/v1/auth/register';
  constructor(private http: HttpClient) { }

  register(data: any){
    console.log(data);
    
    return this.http.post(this.baseUrl,data);
  }
}
