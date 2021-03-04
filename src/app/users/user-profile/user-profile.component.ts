import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import * as numeral from 'numeral';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.services';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  isRTL: boolean;
  uId:string;
  failedToGetDetails:boolean;
  userDetails:any;
  registeredDate:string;
  fName:string;
  lName:string;
  email:string;
  constructor(private appService: AppService, private activatedRoute: ActivatedRoute, private _router:Router, private _auth:AuthService ) {
    this.appService.pageTitle = 'User Profile';
    this.isRTL = appService.isRTL;
   }

  ngOnInit() {
    // if(this._auth.getRole()===false)
    //   this._router.navigate(['/']);
    this.uId = this.activatedRoute.snapshot.paramMap.get('id'); //or params['id'] insted of paramMap.get('id')
    console.log(this.uId);
      this.getUserDetailsBasedOnId(this.uId); 
  }

  userData = {
    latestActivity: '01/23/2018',
    role: 1,
  };

  formatInt(v) {
    return numeral(v).format('0,0');
  }

  getUserDetailsBasedOnId(uId){  
    this._auth.getUserDetails(uId)
    .subscribe(
      data => {
        console.log(data);
        this.registeredDate = data.date;
        this.fName =data.fName;
        this.lName = data.lName;
        this.email = data.email; 
      },
      error => {
        console.log(error);
        this.failedToGetDetails = true;
      });
  }

  failedToGetDetailsAlert(){
    this.failedToGetDetails = false;
  }


}
