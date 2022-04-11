import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
 
  user: any;

  constructor(private authService:AuthService, private router:Router, private userService: UserService ) { }
  public is_loggedIn: boolean;
  ngOnInit(): void {

   this.is_loggedIn = this.authService.isLoggedIn();
   
   //alert(this.is_loggedIn);

    //.log(this.is_loggedIn);
    this.user = this.userService.getUser();
  }

  clearuser(){
    //sessionStorage.clear();
    console.log("hello");
    
    localStorage.removeItem("auth-token");

    console.log(localStorage.getItem("auth-token"));
    
    // window.location.reload();
    // this.router.navigate(['/login']); 

    this.router.navigate(['/login'])
  .then(() => {
    window.location.reload();
  });
  }

}
