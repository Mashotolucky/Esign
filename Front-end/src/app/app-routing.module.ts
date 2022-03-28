import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InterpreterBookingComponent } from './Components/freelancer-components/interpreter-booking/interpreter-booking.component';

const routes: Routes = [ 
  {path: '', component: InterpreterBookingComponent},
  {path: 'interpreterbooking', component: InterpreterBookingComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
