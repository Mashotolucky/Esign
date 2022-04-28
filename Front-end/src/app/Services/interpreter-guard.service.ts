import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class InterpreterGuardService {

  constructor(public auth: AuthService, public router: Router) { }

  canActivate(): boolean {
    if(!this.auth.isInterpreter() && !this.auth.isLoggedIn()) {
      console.log("Not logged as intepreter");
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
