import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { AuthService } from 'src/app/_services/auth.services';

@Component({
  selector: 'app-add-feature',
  templateUrl: './add-feature.component.html',
  styleUrls: ['./add-feature.component.scss']
})
export class AddFeatureComponent implements OnInit {
  addFeature:FormGroup;
  emptyForm:boolean;
  regID:string;
  sucessful:boolean;

  constructor(private _appService: AppService, private _router:Router, private _formBuilder:FormBuilder, private _auth:AuthService) {
    this._appService.pageTitle = 'Add-Feature';
   }

  ngOnInit() {
    this.addFeature = this._formBuilder.group({
      featureName:['',Validators.required],
      moduleName:['',Validators.required],
      createdBy : ['', Validators.required]
    });
  }

  get formControls() { return this.addFeature.controls; }

  submit(){
    console.log(this.addFeature.value);
    if (this.addFeature.invalid) {
      this.emptyForm=true;
      return;
    }
    console.log(this.addFeature.value);
     this._auth.assignFeature(this.addFeature.value)
    .subscribe(
      res => {
        console.log(res);
       
        if(res.status === 'success'){
           this.sucessful = true;
           this. ngOnInit();
        }
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
