import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { AuthService } from 'src/app/_services/auth.services';

@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.scss']
})
export class DesignationComponent implements OnInit {
  assignRole:FormGroup;
  emptyForm:boolean;
  regID:string;
  sucessful:boolean;
  someid=1234; //use for testing when regid is empty

  constructor(private _appService: AppService, private _router:Router, private _formBuilder:FormBuilder, private _auth:AuthService) {
    this._appService.pageTitle = 'Designation page';
   }

  ngOnInit() {
    this.regID = sessionStorage.getItem('regID');

    this.assignRole = this._formBuilder.group({
      module_prepared_by:['',Validators.required],
      tester_name:['',Validators.required],
      tester_id : ['', Validators.required],
      designation : ['', Validators.required],
      user_id:this.regID, //use someid here
    });
    sessionStorage.removeItem('regID');
  }

  get formControls() { return this.assignRole.controls; }

  submit(){
    console.log(this.assignRole.value);
    if (this.assignRole.invalid) {
      this.emptyForm=true;
      return;
    }
    console.log(this.assignRole.value);
      this.sucessful = true;
     this._auth.assignRole(this.assignRole.value)
    .subscribe(
      res => {
        console.log(res);
        if(res.status === 'success')
          this._router.navigate(['/users']);
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

  // closeServerAlert(){
  //   this.serverError=false;
  // }
}
