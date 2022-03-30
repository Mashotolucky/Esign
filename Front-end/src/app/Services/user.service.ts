import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../Models/User';
import { environment } from 'src/environments/environment';

const BaseUrl = environment.backend +'/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAll() {
      return this.http.get<User[]>(`/users`);
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

}