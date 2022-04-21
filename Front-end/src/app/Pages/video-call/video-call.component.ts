import { Component, OnInit, ViewChild ,PLATFORM_ID,ElementRef, Inject, OnDestroy} from '@angular/core';
import { Socket } from 'ngx-socket-io';  
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'app-video-call',
  templateUrl: './video-call.component.html',
  styleUrls: ['./video-call.component.scss']
})

export class VideoCallComponent implements OnInit {

  constructor(@Inject(PLATFORM_ID) private _platform: Object) { }
  navigator:Navigator;
  socketId:any;
  
  @ViewChild('myVideo', {static: true}) video: ElementRef<HTMLVideoElement>;
  @ViewChild('theirVideo', {static: true}) theirvideo: ElementRef<HTMLVideoElement>;
  myStream:MediaStream;
  constraints={
    video: true,
    audio: {
        echoCancellation: true,
        noiseSuppression: true
    }
  }
  /*
  *{ audio: true, video: { facingMode: { exact: "environment" } } } rear camera view
  */

  ngOnInit(): void {
   
  }

  onStart(){
    if(isPlatformBrowser(this._platform) && 'mediaDevices' in navigator) {
      navigator.mediaDevices.getUserMedia(this.constraints).then((ms: MediaStream) => {
        const _video = this.video.nativeElement;
        _video.srcObject = ms;
        _video.play();
        //fetch remote streams
      });
    }
  }
}




