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
 


  constructor(private authService:AuthService, private router:Router, private onlineService: UserService ) { }
  public is_loggedIn: boolean;
  public user:any;
  userLogged:any;
  isintepreterLoggedIn:any;
  role: any;

  // userWho: any;
  ngOnInit(): void {

   this.is_loggedIn = this.authService.isLoggedIn();
   
   //alert(this.is_loggedIn);
   this.userLogged = this.authService.getUser();
   this.role = this.userLogged.role
    console.log(this.role);
    //.log(this.is_loggedIn);
    this.isintepreterLoggedIn = this.userLogged.role === 'CLIENT'? false :true;
     this.user=this.authService.getUser()
     console.log("myuser",this.user)

     

  //   this.userWho= this.authService.getUser()
  //  console.log(this.userWho.role);
      
  }

  GetRole(){
    if(this.role === 'CLIENT'){
      return true;
    }

    return false
  }

  clearuser(){
    //sessionStorage.clear();

   
    let data = {status: false};

    console.log(data);
    const token=localStorage.getItem("auth-token");
    this.onlineService.setOniline(data,token)
    .subscribe(res =>{
      // console.log("offline",res);
      
    })
          
             
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

  btnClick() {
    this.router.navigate(['/profile']).then(()=>{
      // window.location.reload();
      this.onlineService.setLoggedUser(this.user);

    })
  };

  profile(){
    this.onlineService.setLoggedUser(this.user);
  }


  // isInterpreter(){
  //   if(this.userWho.role === 'CLIENT'){
      
  //     return this.router.navigate(['/clientbooking']);
  //   }
  //   return this.router.navigate(['/interpreterbooking']);
  // }


}
