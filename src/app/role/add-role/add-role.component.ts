import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { AuthService } from 'src/app/_services/auth.services';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss']
})
export class AddRoleComponent implements OnInit {
  addRole:FormGroup;
  emptyForm:boolean;
  regID:string;
  sucessful:boolean;

  // featuresData: object[] = [];
  originalFeaturesData: object[] = [];

  constructor(private _appService: AppService, private _router:Router, private _formBuilder:FormBuilder, private _auth:AuthService) {
    this._appService.pageTitle = 'Add-Role';
   }

   features: any = ['login', 'logout', 'delete', 'check'];

  ngOnInit() {
    // this.regID = sessionStorage.getItem('regID');

    this.addRole = this._formBuilder.group({
      roleName:['',Validators.required],
      feature:['',Validators.required],
      createdBy : ['', Validators.required]
    });

    this.getAllFeatureDetails();
    // sessionStorage.removeItem('regID');
  }

  get formControls() { return this.addRole.controls; }


  getAllFeatureDetails(){
    this._auth.getAllFeatures()
    .subscribe(
      data => {
        console.log(data);
        
        this.originalFeaturesData = data.slice(0);
        console.log(this.originalFeaturesData);
      },
      error => {
        console.log(error);
      });
  }

  submit(){
    console.log(this.addRole.value);
    if (this.addRole.invalid) {
      this.emptyForm=true;
      return;
    }
    console.log(this.addRole.value);
     this._auth.assignRole(this.addRole.value)
    .subscribe(
      res => {
        console.log(res);
        this.sucessful = true;
        this. ngOnInit();
      },
      err => {
        console.log(err.message);
        console.log(err);
  },
  )
};
  
  sucessfulChangeAlert(){
    this.sucessful=false;
  }

  closeEmptyFormAlert(){
    this.emptyForm=false;
  }

}
