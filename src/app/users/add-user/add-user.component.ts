import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { AuthService } from 'src/app/_services/auth.services';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  passPattern="^(?=[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]*[A-Z])[A-Za-z0-9]{6,30}$";
  addUserForm:FormGroup;
  emptyForm:boolean;
  serverError:boolean;
  emailAlreadyRegistered=false; 

  constructor(private _appService: AppService, private _auth:AuthService, private _router: Router, private _formBuilder:FormBuilder) {
    this._appService.pageTitle = 'Add User';
   }
   roles: any = ['Admin', 'User'];
  ngOnInit() {
  //   if(this._auth.getRole()==="User")
  //   this._router.navigate(['/shorturl']);
  // if(this._auth.getRole()===false)
  //   this._router.navigate(['/']);
  this.addUserForm = this._formBuilder.group({
    fName:['',Validators.required],
    lName:['',Validators.required],
    email : ['', [Validators.required, Validators.email]],
    password : ['', [Validators.required, Validators.pattern(this.passPattern)]],
    role:['',Validators.required],
  });
  }

  get formControls() { return this.addUserForm.controls; }

  onSubmit() {    
    if (this.addUserForm.invalid) {
      this.emptyForm=true;
      return;
    }
    console.log(this.addUserForm.value);
    this._auth.registerUser(this.addUserForm.value)
    .subscribe(
        res => {
          console.log(res);
          if(res.status === 'success') {
            sessionStorage.setItem('regID',res.data.userId);
            this._router.navigate(['/confirm-page']);
          }
        },
        err => {
          console.log(err.error.errors.email);
          if(err.error.errors.email === "that email is already registered")
            this.emailAlreadyRegistered=true;

            // if(err)
            //     this.serverError=true;

        })
   // this.addUserForm.reset();
 }

closeEmptyFormAlert(){
  this.emptyForm=false;
}

closeAlert(){
  this.emailAlreadyRegistered=false;
}

closeServerAlert(){
  this.serverError=false;
}


}
