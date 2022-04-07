import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  baseUrl = 'http://localhost:4000/api/v1/auth/register';
  constructor(private http: HttpClient) { }

  register(data: any):Observable<any>{  
    return this.http.post(this.baseUrl,data);
  }
}
