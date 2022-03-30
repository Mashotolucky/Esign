import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardComponent } from './Components/freelancer-components/card/card.component';
import { InterpreterBookingComponent } from './Components/freelancer-components/interpreter-booking/interpreter-booking.component';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';

const routes: Routes = [
                        {path: '', component: LoginComponent},
                        {path:'register', component: RegisterComponent},
                        {path:'login', component: LoginComponent},
                        {path:'card', component: CardComponent},
                        {path: 'interpreterbooking', component: InterpreterBookingComponent}
                      ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
