import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { AuthService } from 'src/app/_services/auth.services';

@Component({
  selector: 'app-view-role',
  templateUrl: './view-role.component.html',
  styleUrls: ['./view-role.component.scss']
})
export class ViewRoleComponent implements OnInit {
  isRTL: boolean;
  rId:string;
  roleCode:string;
  roleName:string;
  createdOn:string;
  createdBy:string;
  modifiedOn:string;
  modifiedBy:string;
  featureCode:string;
  successful:boolean;
  failed:boolean;

  constructor(private appService: AppService, private activatedRoute: ActivatedRoute, private _router:Router, private _auth:AuthService) {
    this.appService.pageTitle = 'View Role';
    this.isRTL = appService.isRTL;
   }

  ngOnInit() {
    this.rId = this.activatedRoute.snapshot.paramMap.get('id');
    this.getRoleById(this.rId);
  }
  
  getRoleById(rId){  
    this._auth.getRoleByID(rId)
    .subscribe(
      data => {
        console.log(data);
        
         this.roleCode = data.roleCode;
         this.roleName = data.roleName;
         this.featureCode = data.feature;
         this.createdOn = data.createdOn;
         this.createdBy = data.createdBy;
         this.modifiedOn = data.modifiedOn;
         this.modifiedBy = data.modifiedBy;
      },
      error => {
        console.log(error);
      });
  }

  deleteRole(rId){
    this._auth.removeRole(rId)
      .subscribe(
        data =>{
          console.log(data);
          this.successful = true;
          this._router.navigate(['/roles']);
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
