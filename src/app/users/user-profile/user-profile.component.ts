import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import * as numeral from 'numeral';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.services';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  role:string;
  status:string;
  block = false;

  updateStatus = new FormGroup({
    status: new FormControl('',Validators.required)
  });

  constructor(private appService: AppService, private activatedRoute: ActivatedRoute, private _router:Router, private _auth:AuthService ) {
    this.appService.pageTitle = 'User Profile';
    this.isRTL = appService.isRTL;
   }

  ngOnInit() {
    // if(this._auth.getRole()===false)
    //   this._router.navigate(['/']);
    this.uId = this.activatedRoute.snapshot.paramMap.get('id'); //or params['id'] insted of paramMap.get('id')
    console.log(this.uId);
      this.getUserDetailsById(this.uId); 
      this.getRoleDetailsByID(this.uId);
  }

  toggleBlock(){
    if(status === 'Active')
      this.block = false;
    else if(status === 'Blocked')
      this.block = true;
  }

  onBlock(){
      this.updateStatus.setValue({status:'Blocked'});
      console.log(this.updateStatus);
      this._auth.updateUser(this.uId, this.updateStatus)
      .subscribe(
        data=>{
          console.log(data);
        }, error =>{
          console.log(error);
        }
      )

  }

  onUnblock(){
    this.updateStatus.setValue({status:'Active'});
    console.log(this.updateStatus);
    this._auth.updateUser(this.uId, this.updateStatus)
    .subscribe(
      data=>{
        console.log(data);
      }, error =>{
        console.log(error);
      }
    )

}


  userData = {
    latestActivity: '01/23/2018',
    role: 1,
  };

  formatInt(v) {
    return numeral(v).format('0,0');
  }

  getUserDetailsById(uId){  
    this._auth.getUserDetails(uId)
    .subscribe(
      data => {
        console.log(data);
        this.registeredDate = data.date;
        this.fName =data.fName;
        this.lName = data.lName;
        this.email = data.email; 
        this.role = data.role;
        this.status = data.status;
      },
      error => {
        console.log(error);
        this.failedToGetDetails = true;
      });
  }

  getRoleDetailsByID(uId){
    this._auth.getRoleByID(uId)
    .subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }

}
