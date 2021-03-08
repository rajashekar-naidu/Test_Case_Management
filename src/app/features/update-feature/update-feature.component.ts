import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { AuthService } from 'src/app/_services/auth.services';

@Component({
  selector: 'app-update-feature',
  templateUrl: './update-feature.component.html',
  styleUrls: ['./update-feature.component.scss']
})
export class UpdateFeatureComponent implements OnInit {
  isRTL: boolean;
  failedToGetDetails:boolean;
  editSuccessFul:boolean;
  editFailure:boolean; 
  fId:string;
  featureCode:string;
  featureName:string;
  modifiedBy:string;
  moduleName:string;
  emptyForm:boolean;
  editForm = new FormGroup({
    featureName: new FormControl('',Validators.required),
    moduleName: new FormControl('',Validators.required),
    modifiedBy:  new FormControl('', Validators.required)
  });

  constructor(private _appService:AppService, private _auth:AuthService, private _formBuilder:FormBuilder, private activatedRoute: ActivatedRoute, private _router:Router) {
    this._appService.pageTitle = 'Edit Feature';
    this.isRTL = _appService.isRTL;
   }

  ngOnInit() {
    this.fId = this.activatedRoute.snapshot.paramMap.get('id'); //or params['id'] insted of paramMap.get('id')
    console.log(this.fId);
      this.getFeatureById(this.fId); 
  }
  
  get f(){
    return this.editForm.controls;
  }
      
    setValue(){
      if(this.modifiedBy === undefined){
        this.modifiedBy = "";
      }
      this.editForm.setValue({featureName: this.featureName, moduleName:this.moduleName, modifiedBy:this.modifiedBy});
    }
  
    getFeatureById(fId){  
      this._auth.getFeatureByID(fId)
      .subscribe(
        data => {
          console.log(data);
          
          this.featureName =data.featureName;
          this.moduleName =data.moduleName;
          this.modifiedBy =data.modifiedBy;
          this.featureCode = data.featureCode;
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
      this._auth.updateFeature(this.fId,this.editForm.value)
      .subscribe(
          res => {
            console.log(res);
            this.editSuccessFul = true;
            this. ngOnInit();
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
