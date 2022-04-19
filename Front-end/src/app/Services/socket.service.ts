import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';  
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private socket: Socket) { }
  
  getMessages(): Observable<any> {
    return this.socket.fromEvent('message');
  }

  sendMessage(payload): void {
    this.socket.emit('send-message', payload);
  }
  getIceServer() {
    return {
        iceServers: [
            {
                urls: ["stun:eu-turn4.xirsys.com"]
            },
            {
                username: "ml0jh0qMKZKd9P_9C0UIBY2G0nSQMCFBUXGlk6IXDJf8G2uiCymg9WwbEJTMwVeiAAAAAF2__hNSaW5vbGVl",
                credential: "4dd454a6-feee-11e9-b185-6adcafebbb45",
                urls: [
                    "turn:eu-turn4.xirsys.com:80?transport=udp",
                    "turn:eu-turn4.xirsys.com:3478?transport=tcp"
                ]
            }
        ]
    };
  }
}
