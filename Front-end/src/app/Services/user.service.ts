import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../Models/User';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const BaseUrl = environment.backend +'/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAll() {
      return this.http.get<User[]>(`/users`);
  }

  getAllinterpreter() {
    return this.http.get<User[]>(`http://localhost:4000/api/v1/users/intepreters/getAll`);
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

  setOniline(data: any):Observable<any[]> {
    return this.http.put<any[]>(`http://localhost:4000/api/v1/users/intepreter/online`,data)
  }
  
}

