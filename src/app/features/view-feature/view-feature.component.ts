import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { AuthService } from 'src/app/_services/auth.services';

@Component({
  selector: 'app-view-feature',
  templateUrl: './view-feature.component.html',
  styleUrls: ['./view-feature.component.scss']
})
export class ViewFeatureComponent implements OnInit {
  isRTL: boolean;
  fId:string;
  featureCode:string;
  featureName:string;
  createdOn:string;
  createdBy:string;
  modifiedOn:string;
  modifiedBy:string;
  moduleName:string;
  successful:boolean;
  failed:boolean;

  constructor(private appService: AppService, private activatedRoute: ActivatedRoute, private _router:Router, private _auth:AuthService ) {
    this.appService.pageTitle = 'View Feature';
    this.isRTL = appService.isRTL;
   }

  ngOnInit() {
    this.fId = this.activatedRoute.snapshot.paramMap.get('id');
    this.getFeatureDetailsById(this.fId);
  }
  

  getFeatureDetailsById(fId){  
    this._auth.getFeatureByID(fId)
    .subscribe(
      data => {
         this.featureCode = data.featureCode;
         this.featureName = data.featureName;
         this.moduleName = data.moduleName;
         this.createdOn = data.createdOn;
         this.createdBy = data.createdBy;
         this.modifiedOn = data.modifiedOn;
         this.modifiedBy = data.modifiedBy;
      },
      error => {
        console.log(error);
      });
  }

  deleteFeature(fId){
    this._auth.removeFeature(fId)
      .subscribe(
        data =>{
          console.log(data);
          this.successful = true;
          this._router.navigate(['/features']);
        }, error=> {
          console.log(error);
          this.failed = true;
        }
      )
  }

  deleteSuccessfulAlert(){
    this.successful = false;
  }

  deleteFailedAlert(){
    this.failed = false;
  }

}
