import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { interval } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  BaseUrl = environment.production? environment.backend+'/bookings' : environment.devbaseUrl+'/bookings';
  
  //baseUrl = 'http://localhost:4000/api/v1/';
  constructor(private http: HttpClient) { }

  booking(data: any,token:any){
    let headers=new HttpHeaders();
    headers=headers.set('Authorization',"Bearer "+token);
    return this.http.post(this.BaseUrl+"/booking/create",data,{headers});
  }

  getAllbooking(token: any){
    let headers=new HttpHeaders();
    headers=headers.set('Authorization',"Bearer "+token);
    return this.http.get(this.BaseUrl+"/booking/intepreter/",{headers})
  }

  getAllinterpreterbooking(token: any){
    let headers=new HttpHeaders();
    headers=headers.set('Authorization',"Bearer "+token);
    return interval(1000).pipe(switchMap(() => this.http.get(this.BaseUrl+"/booking/intepreter/",{headers})))
  }

  getAllinterpreterstreams(token: any){
    let headers=new HttpHeaders();
    headers=headers.set('Authorization',"Bearer "+token);
    return this.http.get(this.BaseUrl+"/stream/intepreter/",{headers})
  }

  getAllinterpreterhistory(token: any){
    let headers=new HttpHeaders();
    headers=headers.set('Authorization',"Bearer "+token);
    return this.http.get(this.BaseUrl,{headers})
  }

  getAllclientbooking(token: any){
    let headers=new HttpHeaders();
    headers=headers.set('Authorization',"Bearer "+token);
    return this.http.get(this.BaseUrl+"/booking/client/",{headers})
  }

  getAllclientstreams(token: any){
    let headers=new HttpHeaders();
    headers=headers.set('Authorization',"Bearer "+token);
    return this.http.get(this.BaseUrl,{headers})
  }

  getAllclienthistory(token: any){
    let headers=new HttpHeaders();
    headers=headers.set('Authorization',"Bearer "+token);
    return this.http.get(this.BaseUrl,{headers})
  }


  setBookingStatus(status: boolean, id:any) {
    let data = {
      status,
      id
    }
    return this.http.put(this.BaseUrl+"/booking/update/status", data);
  }
}
