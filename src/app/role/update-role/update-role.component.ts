import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { AuthService } from 'src/app/_services/auth.services';

@Component({
  selector: 'app-update-role',
  templateUrl: './update-role.component.html',
  styleUrls: ['./update-role.component.scss']
})
export class UpdateRoleComponent implements OnInit {
  isRTL: boolean;
  failedToGetDetails:boolean;
  editSuccessFul:boolean;
  editFailure:boolean; 
  rId:string;
  roleCode:string;
  roleName:string;
  modifiedBy:string;
  featureCode:string;
  emptyForm:boolean;
  features:any;
  editForm = new FormGroup({
    roleName: new FormControl('',Validators.required),
    feature: new FormControl('',Validators.required),
    modifiedBy:  new FormControl('', Validators.required)
  });

  constructor(private _appService:AppService, private _auth:AuthService, private _formBuilder:FormBuilder, private activatedRoute: ActivatedRoute, private _router:Router) {
    this._appService.pageTitle = 'Edit Role';
    this.isRTL = _appService.isRTL;
   }

  ngOnInit() {
    this.rId = this.activatedRoute.snapshot.paramMap.get('id'); //or params['id'] insted of paramMap.get('id')
    console.log(this.rId);
      this.getRoleById(this.rId); 
      this.getAllFeatures();
  }

  get f(){
    return this.editForm.controls;
  }
      
    setValue(){
      if(this.modifiedBy === undefined){
        this.modifiedBy = "";
      }
      this.editForm.setValue({roleName: this.roleName, feature:this.featureCode, modifiedBy:this.modifiedBy});
    }

    getAllFeatures(){
      this._auth.getAllFeatures()
        .subscribe(
          data=>{
            console.log(data);
            this.features = data;
            
          }, error=>{
              console.log(error);
              
          }
        )
      
    }
  
    getRoleById(rId){  
      this._auth.getRoleByID(rId)
      .subscribe(
        data => {
          console.log(data);
          
          this.roleName =data.roleName;
          this.featureCode =data.feature[0];
          this.modifiedBy =data.modifiedBy;
          this.roleCode = data.roleCode;
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
      this._auth.updateRole(this.rId,this.editForm.value)
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
