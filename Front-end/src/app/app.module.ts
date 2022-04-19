import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserProfileComponent } from './Components/users-components/user-profile/user-profile.component';
import { UpdateProfileComponent } from './Components/freelancer-components/update-profile/update-profile.component';
import { DashboardComponent } from './Components/admin-components/dashboard/dashboard.component';
import { WelcomeComponent } from './Pages/welcome/welcome.component';
import { HomeComponent } from './Pages/home/home.component';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';
import { FreelancerDetailsComponent } from './Modals/freelancer-details/freelancer-details.component';
import { LogsComponent } from './Components/users-components/logs/logs.component';
import { ProfileComponent } from './Pages/profile/profile.component';
import { ProfileCardComponent } from './Components/users-components/profile-card/profile-card.component';
import { InforCardsComponent } from './Components/users-components/infor-cards/infor-cards.component';
import { BookingComponent } from './Modals/booking/booking.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { InterpreterBookingComponent } from './Components/freelancer-components/interpreter-booking/interpreter-booking.component';
import { NavbarComponent } from './Components/navbar/navbar.component';

//import { CardComponent } from './Components/freelancer-components/card/card.component';
import { UserBookingComponent } from './Components/users-components/user-booking/user-booking.component';
import { MediaComponent } from './Components/media/media.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuardService } from './Services/auth-guard.service';
import { VideoCallComponent } from './Pages/video-call/video-call.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';


const config: SocketIoConfig = {
	url: environment.socketUrl, // socket server url;
	options: {
		transports: ['websocket']
	}
}

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    UpdateProfileComponent,
    DashboardComponent,
    WelcomeComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    FreelancerDetailsComponent,
    LogsComponent,
    ProfileComponent,
    ProfileCardComponent,
    InforCardsComponent,
    BookingComponent,
    InterpreterBookingComponent,
    NavbarComponent,
    //CardComponent,
    UserBookingComponent,
    BookingComponent,
   
    MediaComponent,
        VideoCallComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    SocketIoModule.forRoot(config),
    HttpClientModule
  ],
  providers: [AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
