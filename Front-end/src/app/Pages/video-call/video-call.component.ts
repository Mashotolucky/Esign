import { Component, OnInit, ViewChild ,PLATFORM_ID,ElementRef, Inject, OnDestroy} from '@angular/core';
import { Socket } from 'ngx-socket-io';  

import { FormBuilder, FormControl, Validators } from '@angular/forms'

import { Conversation, UserAgent, Session, Stream } from '@apirtc/apirtc'
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-video-call',
  templateUrl: './video-call.component.html',
  styleUrls: ['./video-call.component.scss']
})

export class VideoCallComponent implements OnInit {

  videoId: any;

  constructor(private activatedRoute:ActivatedRoute, private router:Router) { }
  navigator:Navigator;
 
  myStream:MediaStream;
  constraints={
    video: { facingMode: { exact: "environment" } },
    audio: {
        echoCancellation: true,
        noiseSuppression: true
    }
  }
  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(params => {
      // console.log(params.get('id'));
      console.log("kjgjhvjhh");
      
       this.videoId = params.get('id');
       console.log(this.videoId);
       
        //this.activatedRoute.snapshot.paramMap.get('id');
      });
      if(this.videoId) this.getOrcreateConversation()
      else{ Swal.fire({
        icon: 'error',
        title: 'can not join stream at this point',
        showConfirmButton: false,
        timer: 1000,
        width: '300px'
    })
    this.router.navigate(['/'])
  }
   
  }
  @ViewChild("localVideo") videoRef: ElementRef;

  conversation: any;
  remotesCounter = 0;
  localStream=null;
  getOrcreateConversation() {
   // var localStream = null;
    //CREATE USER AGENT
    var userAgent = new UserAgent({
      uri: `${environment.videoUri}`
    });
    // REGISTER
    
    userAgent.register().then((session: Session) => {

      
      // CREATE CONVERSATION
      
      const conversation: Conversation = session.getConversation(this.videoId);
      this.conversation = conversation;

      
      //  ADD EVENT LISTENER : WHEN NEW STREAM IS AVAILABLE IN CONVERSATION
      
      conversation.on('streamListChanged', (streamInfo: any) => {
        console.log("streamListChanged :", streamInfo);
        if (streamInfo.listEventType === 'added') {
          if (streamInfo.isRemote === true) {
            conversation.subscribeToMedia(streamInfo.streamId)
              .then((stream: Stream) => {
                console.log('subscribeToMedia success', stream);
              }).catch((err) => {
                console.error('subscribeToMedia error', err);
              });
          }
        }
      });
      
      //  ADD EVENT LISTENER : WHEN STREAM IS ADDED/REMOVED TO/FROM THE CONVERSATION
    
      conversation.on('streamAdded', (stream: Stream) => {
        this.remotesCounter += 1;
        stream.addInDiv('remote-container', 'remote-media-' + stream.streamId, {width:'100%'}, false);
      }).on('streamRemoved', (stream: any) => {
        this.remotesCounter -= 1;
        stream.removeFromDiv('remote-container', 'remote-media-' + stream.streamId);
      });

  
      // CREATE LOCAL STREAM
      
      userAgent.createStream({
        constraints: {
          audio: {
            echoCancellation: true,
           },
          video: true
        }
      }).then((stream: Stream) => {

          console.log('createStream :', stream);

          // Save local stream
          this.localStream = stream;

          // Display stream
          this.localStream.attachToElement(this.videoRef.nativeElement);

          // JOIN CONVERSATION
          conversation.join()
            .then(() => {
              // PUBLISH LOCAL STREAM
              conversation.publish(this.localStream).then((stream: Stream) => {
                console.log('published', stream);
              }).catch((err: any) => {
                console.error('publish error', err);
              });
            }).catch((err: any) => {
              console.error('Conversation join error', err);
            });
        }).catch((err: any) => {
          console.error('create stream error', err);
        });
    });
  }


  dropVideo(){
  this.conversation.leave().then(() => {
    this.conversation.destroy();
  });
  }
  muteVideo(){
        // toggle audio
    if (this.localStream.isAudioMuted()) {
      this.localStream.unmuteAudio();
    } else {
      this.localStream.muteAudio();
    }
  }

  turnOffScreen(){
      // toggle video
      if (this.localStream.isVideoMuted()) {
        this.localStream.unmuteVideo();
      } else {
        this.localStream.muteVideo();
      }
  }
}




