import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  baseUrl = '';
  constructor(private http: HttpClient) { }

  booking(data: any,token:any){
    let headers=new HttpHeaders();
    headers=headers.set('Authorization',"Bearer "+token);
    return this.http.post(this.baseUrl+"users/booking/create",data,{headers});
  }

  getAllbooking(token){
    let headers=new HttpHeaders();
    headers=headers.set('Authorization',"Bearer "+token);
    return this.http.get(this.baseUrl+"users/booking/interpreter/",{headers})
  }



}
