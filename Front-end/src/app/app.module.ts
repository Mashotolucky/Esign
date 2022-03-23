import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
import { InterpreterBookingComponent } from './Components/freelancer-components/interpreter-booking/interpreter-booking.component';

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
    InterpreterBookingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
