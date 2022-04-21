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
  // @ViewChild("localVideo") videoRef: ElementRef;

  // conversationFormGroup = this.fb.group({
  //   name: this.fb.control('', [Validators.required])
  // });

  // constructor(private fb: FormBuilder) {
  // }

  // get conversationNameFc(): FormControl {
  //   return this.conversationFormGroup.get('name') as FormControl;
  // }

  // conversation: any;
  // remotesCounter = 0;

  // getOrcreateConversation() {
  //   var localStream = null;

  //   //==============================
  //   // 1/ CREATE USER AGENT
  //   //==============================
  //   var userAgent = new UserAgent({
  //     uri: 'apiKey:myDemoApiKey'
  //   });

  //   //==============================
  //   // 2/ REGISTER
  //   //==============================
  //   userAgent.register().then((session: Session) => {

  //     //==============================
  //     // 3/ CREATE CONVERSATION
  //     //==============================
  //     const conversation: Conversation = session.getConversation(this.conversationNameFc.value);
  //     this.conversation = conversation;

  //     //==========================================================
  //     // 4/ ADD EVENT LISTENER : WHEN NEW STREAM IS AVAILABLE IN CONVERSATION
  //     //==========================================================
  //     conversation.on('streamListChanged', (streamInfo: any) => {
  //       console.log("streamListChanged :", streamInfo);
  //       if (streamInfo.listEventType === 'added') {
  //         if (streamInfo.isRemote === true) {
  //           conversation.subscribeToMedia(streamInfo.streamId)
  //             .then((stream: Stream) => {
  //               console.log('subscribeToMedia success', stream);
  //             }).catch((err) => {
  //               console.error('subscribeToMedia error', err);
  //             });
  //         }
  //       }
  //     });
  //     //=====================================================
  //     // 4 BIS/ ADD EVENT LISTENER : WHEN STREAM IS ADDED/REMOVED TO/FROM THE CONVERSATION
  //     //=====================================================
  //     conversation.on('streamAdded', (stream: Stream) => {
  //       this.remotesCounter += 1;
  //       stream.addInDiv('remote-container', 'remote-media-' + stream.streamId, {}, false);
  //     }).on('streamRemoved', (stream: any) => {
  //       this.remotesCounter -= 1;
  //       stream.removeFromDiv('remote-container', 'remote-media-' + stream.streamId);
  //     });

  //     //==============================
  //     // 5/ CREATE LOCAL STREAM
  //     //==============================
  //     userAgent.createStream({
  //       constraints: {
  //         audio: true,
  //         video: true
  //       }
  //     })
  //       .then((stream: Stream) => {

  //         console.log('createStream :', stream);

  //         // Save local stream
  //         localStream = stream;

  //         // Display stream
  //         localStream.attachToElement(this.videoRef.nativeElement);

  //         //==============================
  //         // 6/ JOIN CONVERSATION
  //         //==============================
  //         conversation.join()
  //           .then(() => {
  //             //==============================
  //             // 7/ PUBLISH LOCAL STREAM
  //             //==============================
  //             conversation.publish(localStream).then((stream: Stream) => {
  //               console.log('published', stream);
  //             }).catch((err: any) => {
  //               console.error('publish error', err);
  //             });
  //           }).catch((err: any) => {
  //             console.error('Conversation join error', err);
  //           });
  //       }).catch((err: any) => {
  //         console.error('create stream error', err);
  //       });
  //   });
  // }
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




