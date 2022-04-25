import { Component, OnInit , Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnInit {
  

  @Input() user: any;

  constructor(private activatedRoute:ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    // this.activatedRoute.params.subscribe(params => {
    //     // console.log("profile", params);
    //     this.user = params
    //     this.userService.user(params);
    //   });
  }

}
