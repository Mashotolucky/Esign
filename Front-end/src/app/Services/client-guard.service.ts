import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ClientGuardService {

 
  constructor(public auth: AuthService, public router: Router) { }

  canActivate(): boolean {
    if(!this.auth.isClient() && !this.auth.isLoggedIn()) {
      console.log("Not logged as client");
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
