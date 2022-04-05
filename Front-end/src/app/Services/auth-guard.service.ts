import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(public auth: AuthService, public router: Router) { }

  canActivate(): boolean {
    if(!this.auth.isLoggedIn()) {
      console.log("Not logged in");
      this.router.navigate(['/login']);

      return false;
    }

    return true;
  }
}
