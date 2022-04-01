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
import { ProfileComponent } from './Pages/profile/profile.component';
import { InterpreterBookingComponent } from './Components/freelancer-components/interpreter-booking/interpreter-booking.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from './Components/freelancer-components/card/card.component';
import { MediaComponent } from './Components/media/media.component';
import { HttpClientModule } from '@angular/common/http';

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
    InterpreterBookingComponent,
    NavbarComponent,
    CardComponent,
    MediaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
