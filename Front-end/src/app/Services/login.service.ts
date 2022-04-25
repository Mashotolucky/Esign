import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  BaseUrl = environment.production? environment.backend +'/auth/login' : environment.devbaseUrl+'/auth/login';
  
 // baseUrl = 'http://localhost:4000/api/v1/auth/login';
  constructor(private http: HttpClient) { }

  login(data: any){
    return this.http.post(this.BaseUrl,data);
  }
}
