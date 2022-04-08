import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private authService:AuthService ) { }
  public is_loggedIn: boolean;
  ngOnInit(): void {

   this.is_loggedIn = this.authService.isLoggedIn();
   
   //alert(this.is_loggedIn);

    //.log(this.is_loggedIn);
      
  }

  clearuser(){
    //sessionStorage.clear();
    console.log("hello");
    
    localStorage.removeItem("auth-token");

    console.log(localStorage.getItem("auth-token"));
    
    window.location.reload();
  }

}
