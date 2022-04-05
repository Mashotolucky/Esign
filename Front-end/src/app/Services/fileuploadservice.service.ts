import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';;

@Injectable({
  providedIn: 'root'
})
export class FileuploadserviceService {

  private baseApiUrl = 'http://localhost:4000/api/upload';
  private baseApiUrlVid = 'http://localhost:4000/api/upload/video';
  private baseApiUrlDoc = 'http://localhost:4000/api/upload/document';
  private urlGet = 'http://localhost:4000/api/images';

  constructor(private http: HttpClient) { }

  uploadImage(images: any) {
    return this.http.post(`${this.baseApiUrl}`, images)
  }
  uploadVideo(video:any){
    return this.http.post(`${this.baseApiUrlVid}`,video)
  }
  uploadDocument(document:any){
    console.log(document);
    
    return this.http.post(`${this.baseApiUrlDoc}`,document)
  }

  getImage() {
    return this.http.get(`${this.urlGet}`)
  }

}
