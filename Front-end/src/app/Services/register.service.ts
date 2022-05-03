import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  interpreterData: any;
  BaseUrl = environment.production? environment.backend +'/auth/register' : environment.devbaseUrl+'/auth/register';
  constructor(private http: HttpClient) { }

  register(data: any):Observable<any>{  
    this.interpreterData = data;
    return this.http.post(this.BaseUrl,data);
  }

  setInterpreter(){
    console.log(this.interpreterData);
    
    return this.interpreterData;
  }
}
