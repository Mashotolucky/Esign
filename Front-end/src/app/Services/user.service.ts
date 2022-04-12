import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { User } from '../Models/User';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const BaseUrl = environment.backend +'/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  intepreterID: any;
  clickedUser: any;

  constructor(private http: HttpClient) { }

  getAll() {
      return this.http.get<User[]>(`/users`);
  }

  getAllinterpreter() {
    return this.http.get<User[]>(`http://localhost:4000/api/v1/users/intepreters/getAll`);
  }

  setInterpretorId(id:any): void{
    this.intepreterID = id;
  
    console.log(this.intepreterID);
    
  }
  getInterpreterId() {
    
    console.log(this.intepreterID);
    return this.intepreterID;
  }

  register(user: User) {
      return this.http.post(`${BaseUrl}/register`, user);
  }

  signin(user: User) {
    return this.http.post(`${BaseUrl}/signin`, user);
}

  delete(id: number) {
      return this.http.delete(`/users/${id}`);
  }
 
  getLanguages():Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:4000/api/v1/users/languages`)

  }

  setOniline(data: any, token: any):Observable<any[]> {
    let headers=new HttpHeaders();
    headers=headers.set('Authorization',"Bearer "+token);
    return this.http.put<any[]>(`http://localhost:4000/api/v1/users/intepreter/online`,data,{headers});
  }

  user(data: any) {
    this.clickedUser = data;
    console.log(this.clickedUser);
    
    return this.clickedUser;
  }

  getUser(){
    // console.log(this.clickedUser);
    
    return this.clickedUser[0];
  }
  
}

