import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardComponent } from './Components/freelancer-components/card/card.component';
import { InterpreterBookingComponent } from './Components/freelancer-components/interpreter-booking/interpreter-booking.component';
import { BookingComponent } from './Pages/booking/booking.component';
import { UserBookingComponent } from './Components/users-components/user-booking/user-booking.component';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';
import { HomeComponent } from './Pages/home/home.component';

const routes: Routes = [
                        {path: '', component: HomeComponent},
                        {path: 'login', component: LoginComponent},
                        {path:'register', component: RegisterComponent},
                        {path:'login', component: LoginComponent},
                        {path:'card', component: CardComponent},
                        {path: 'interpreterbooking', component: InterpreterBookingComponent},
                        {path:'user-booking',component:BookingComponent}
                      ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
