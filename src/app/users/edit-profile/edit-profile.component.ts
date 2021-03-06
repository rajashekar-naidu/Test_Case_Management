import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { AuthService } from 'src/app/_services/auth.services';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  isRTL: boolean;
  passPattern="^(?=[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]*[A-Z])[A-Za-z0-9]{6,30}$";
  firstName:string;
  lastName:string;
  emailAddress:string;
  failedToGetDetails:boolean;
  editSuccessFul:boolean;
  editFailure:boolean;
  emailAlreadyRegistered=false; 
  uId:string;
  emptyForm:boolean;
  editForm = new FormGroup({
    fName: new FormControl('',Validators.required),
    lName: new FormControl('',Validators.required),
    email:  new FormControl('', [Validators.required, Validators.email])
  });

  constructor(private _appService:AppService, private _auth:AuthService, private _formBuilder:FormBuilder, private activatedRoute: ActivatedRoute, private _router:Router ) {
    this._appService.pageTitle = 'Edit Profile';
    this.isRTL = _appService.isRTL;
   }

  ngOnInit() {
    // if(this._auth.getRole()===false)
    //   this._router.navigate(['/']);
    this.uId = this.activatedRoute.snapshot.paramMap.get('id'); //or params['id'] insted of paramMap.get('id')
    console.log(this.uId);
      this.getUserDetailsBasedOnId(this.uId); 
  }

  
  get f(){
    return this.editForm.controls;
  }
      
    setValue(){
      this.editForm.setValue({fName: this.firstName, lName:this.lastName, email:this.emailAddress});
    }
  
    getUserDetailsBasedOnId(uId){  
      this._auth.getUserDetails(uId)
      .subscribe(
        data => {
          this.firstName =data.fName;
          this.lastName =data.lName;
          this.emailAddress =data.email;
          this.setValue();
        },
        error => {
          console.log(error);
          this.failedToGetDetails = true;
        });
    }
  
    onSubmit() {   
      console.log(this.editForm.value);
      if (this.editForm.invalid) {
        this.emptyForm=true;
         return;
      }
      console.log(this.editForm.value);
      this._auth.updateUser(this.uId,this.editForm.value)
      .subscribe(
          res => {
            console.log(res);
            this.editSuccessFul = true;
          },
          err => {
            console.log(err);
            this.editFailure = true;
          }
    )};

    clear(){
      this.ngOnInit();
    }
  
    editSuccessFulAlert(){
      this.editSuccessFul = false;
    }
  
    editFailureAlert(){
      this.editFailure = false;
    }

    closeEmptyFormAlert(){
      this.emptyForm=false;
    }
  
}
