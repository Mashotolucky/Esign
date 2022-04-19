import { Component, OnInit, ViewChild ,PLATFORM_ID,ElementRef, Inject, OnDestroy} from '@angular/core';
import { Socket } from 'ngx-socket-io';  
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'app-video-call',
  templateUrl: './video-call.component.html',
  styleUrls: ['./video-call.component.scss']
})

export class VideoCallComponent implements OnInit , OnDestroy {

  constructor(@Inject(PLATFORM_ID) private _platform: Object) { }
  navigator:Navigator;
  socketId:any;
  
  @ViewChild('myVideo', {static: true}) video: ElementRef<HTMLVideoElement>;
  @ViewChild('theirVideo', {static: true}) theirvideo: ElementRef<HTMLVideoElement>;

  // var randomNumber = `__${h.generateRandomString()}__${h.generateRandomString()}__`;

  myStream:MediaStream;
  constraints={
    video: true,
    audio: false
  }
  
  /*
  *{ audio: true, video: { facingMode: { exact: "environment" } } }
  *
  */

  ngOnInit(): void {
   this.onStart(); // for test 
   //this.getMedia(this.constraints);
  }
  async getMedia(constraints) {
    let stream: MediaStream;
    try {
        if(isPlatformBrowser(this._platform) && 'mediaDevices' in navigator) {
            stream = await navigator.mediaDevices.getUserMedia(constraints);
            /* use the stream */
            const _video = this.video.nativeElement;
            _video.srcObject = stream;
            _video.play(); 
        }
    } catch(err) {
      /* handle the error */
      throw err;
    }
  }
  onStart(){
    if(isPlatformBrowser(this._platform) && 'mediaDevices' in navigator) {
      navigator.mediaDevices.getUserMedia({video: true}).then((ms: MediaStream) => {
        const _video = this.video.nativeElement;
        _video.srcObject = ms;
        _video.play(); 
        this.onConnection()
      });
    }
  }
  onConnection(){
    if(isPlatformBrowser(this._platform) && 'mediaDevices' in navigator) {
      navigator.mediaDevices.getUserMedia({video: true}).then((ms: MediaStream) => {
        const _video = this.theirvideo.nativeElement;
        _video.srcObject = ms;
        _video.play(); 
      });
    }
  }

  onStop() {
    this.video.nativeElement.pause();
    (this.video.nativeElement.srcObject as MediaStream).getVideoTracks()[0].stop();
    this.video.nativeElement.srcObject = null;
  }

  ngOnDestroy() {
    (this.video.nativeElement.srcObject as MediaStream).getVideoTracks()[0].stop();
    this.video.nativeElement.srcObject = null;
 }
}
