import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { AuthService } from 'src/app/_services/auth.services';

@Component({
  selector: 'app-user-activities',
  templateUrl: './user-activities.component.html',
  styleUrls: ['./user-activities.component.scss']
})
export class UserActivitiesComponent implements OnInit {
  fName:string;
  lName:string;
  uId:string;
  urls:any;
  urlsById:any;
  logDetailsById:any;
  failedToGetDetails:boolean;

  constructor(private _appService:AppService, private _auth:AuthService, private activatedRoute:ActivatedRoute, private _router:Router) {
    this._appService.pageTitle = 'User Activity';
   }
    
  ngOnInit() {
    // if(this._auth.getRole()===false)
    // this._router.navigate(['/']);
    this.uId = this.activatedRoute.snapshot.paramMap.get('id'); //or params['id'] insted of paramMap.get('id')
    console.log(this.uId);
    this.getUserDetailsBasedOnId(this.uId);
    //this.getAllUrlDetails();
    this.getLogDetailsByID(this.uId);
  }

  getUserDetailsBasedOnId(uId){
    if(uId === null)
    uId = this._auth.getuId();
    console.log(uId);

    this._auth.getUserDetails(uId)
    .subscribe(
      data => {
        this.fName =data.fName;
        this.lName =data.lName;
      },
      error => {
        console.log(error);
        this.failedToGetDetails = true;
      });
  }

  getLogDetailsByID(uId){
    if(uId === null)
    uId = this._auth.getuId();
    console.log(uId);

    this._auth.userLogsByID(uId)
    .subscribe(
      data => {
        console.log(data);
        this.logDetailsById = data || [];
      },
      error => {
        console.log(error);
        this.failedToGetDetails = true;
    });
  }

}
