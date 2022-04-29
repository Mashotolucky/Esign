import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { HomeComponent } from './Components/freelancer-components/card/card.component';
import { InterpreterBookingComponent } from './Pages/interpreter-booking/interpreter-booking.component';

import { UserBookingComponent } from './Components/users-components/user-booking/user-booking.component';
import { UserProfileComponent } from './Components/users-components/user-profile/user-profile.component';
import { HomeComponent } from './Pages/home/home.component';
import { LoginComponent } from './Pages/login/login.component';
import { ProfileComponent } from './Pages/profile/profile.component';
import { RegisterComponent } from './Pages/register/register.component';
import{NavbarComponent} from './Components/navbar/navbar.component';
import { AuthGuardService } from './Services/auth-guard.service';
import { VideoCallComponent } from './Pages/video-call/video-call.component';
import { ClientBookingComponent } from './Pages/client-booking/client-booking.component';
import { VideoViewComponent } from './Pages/video-view/video-view.component';
import { LandingComponent } from './Pages/landing/landing.component';
import { EditComponent } from './Pages/edit/edit.component';
import { InterpreterGuardService } from './Services/interpreter-guard.service';
import { ClientGuardService } from './Services/client-guard.service';


const routes: Routes = [
                        {path:'landing',component: LandingComponent},
                        {path:'nav',component:NavbarComponent},
                        {path: 'home', component: HomeComponent},
                        {path: 'login', component: LoginComponent},
                        {path:'register', component: RegisterComponent},
                        {path: 'interpreterbooking', component: InterpreterBookingComponent , canActivate:[InterpreterGuardService]},
                        {path: 'clientbooking', component: ClientBookingComponent, canActivate:[ClientGuardService]},
                        {path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]},
                        // {path: 'user', component: UserProfileComponent},

                        {path: 'stream/:id', component: VideoCallComponent},
                        {path:'landing',component:LandingComponent},
                        {path:'edit',component:EditComponent},

                        {path: 'stream', component: VideoCallComponent},
                        {path: 'video', component: VideoViewComponent},
                        {path: 'stream/:id', component: VideoCallComponent , canActivate: [AuthGuardService]}
                      
                      ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
