import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { HomeComponent } from './Components/freelancer-components/card/card.component';
import { InterpreterBookingComponent } from './Components/freelancer-components/interpreter-booking/interpreter-booking.component';
import { BookingComponent } from './Pages/booking/booking.component';
import { UserBookingComponent } from './Components/users-components/user-booking/user-booking.component';
import { UserProfileComponent } from './Components/users-components/user-profile/user-profile.component';
import { HomeComponent } from './Pages/home/home.component';
import { LoginComponent } from './Pages/login/login.component';
import { ProfileComponent } from './Pages/profile/profile.component';
import { RegisterComponent } from './Pages/register/register.component';
import{NavbarComponent} from './Components/navbar/navbar.component';
import { AuthGuardService } from './Services/auth-guard.service';
import { VideoCallComponent } from './Pages/video-call/video-call.component';

const routes: Routes = [
                        {path: '', component: HomeComponent},
                        {path: 'login', component: LoginComponent},
                        {path:'register', component: RegisterComponent},
                        {path:'login', component: LoginComponent},
                       // {path:'card', component: CardComponent},
                        {path: 'interpreterbooking', component: InterpreterBookingComponent},
                        {path:'user-booking',component:BookingComponent},
                        {path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]},
                        {path: 'user', component: UserProfileComponent},
                        {path:'nav',component:NavbarComponent},
                        {path: 'stream', component: VideoCallComponent}
                      ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
