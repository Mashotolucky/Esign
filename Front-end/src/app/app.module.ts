import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserProfileComponent } from './Components/users-components/user-profile/user-profile.component';
import { HomeComponent } from './Pages/home/home.component';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';
import { ProfileComponent } from './Pages/profile/profile.component';
import { ProfileCardComponent } from './Components/users-components/profile-card/profile-card.component';
import { InforCardsComponent } from './Components/users-components/infor-cards/infor-cards.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { InterpreterBookingComponent } from './Pages/interpreter-booking/interpreter-booking.component';
import { NavbarComponent } from './Components/navbar/navbar.component';

//import { CardComponent } from './Components/freelancer-components/card/card.component';
import { UserBookingComponent } from './Components/users-components/user-booking/user-booking.component';

import { HttpClientModule } from '@angular/common/http';
import { AuthGuardService } from './Services/auth-guard.service';
import { VideoCallComponent } from './Pages/video-call/video-call.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { ClientBookingComponent } from './Pages/client-booking/client-booking.component';
import { StatusPipe } from './Pipes/status.pipe';
import { TimeFormatPipe } from './Pipes/time-format.pipe';
import { VideoViewComponent } from './Pages/video-view/video-view.component';
import { LandingComponent } from './Pages/landing/landing.component';
import { EditComponent } from './Pages/edit/edit.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';




// const config: SocketIoConfig = {
// 	url: environment.socketUrl, // socket server url;
// 	options: {
// 		transports: ['websocket']
// 	}
// }

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ProfileCardComponent,
    InforCardsComponent,
    InterpreterBookingComponent,
    NavbarComponent,
    UserBookingComponent,
    ClientBookingComponent,
    VideoCallComponent,
    StatusPipe,
    TimeFormatPipe,
    LandingComponent,
    EditComponent 
    
          
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    NgxUiLoaderModule,
    // SocketIoModule.forRoot(config),
    HttpClientModule
  ],
  providers: [AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
