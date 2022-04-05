import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  baseUrl = '';
  constructor(private http: HttpClient) { }

  booking(data: any){
    return this.http.post(this.baseUrl,data);
  }
}
