import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { AuthService } from 'src/app/_services/auth.services';

@Component({
  selector: 'app-all-roles',
  templateUrl: './all-roles.component.html',
  styleUrls: ['./all-roles.component.scss']
})
export class AllRolesComponent implements OnInit {
  isRTL: boolean;  
  cantFetchRoleDetails:boolean;
  cantRemoveRole:boolean;
  RemoveRole:boolean;
  length;

  constructor(private _appService:AppService, 
    private _router:Router, 
    private _auth:AuthService,) { 
      this._appService.pageTitle = 'Roles';
      this.isRTL = _appService.isRTL;
    }

    searchKeys = ['roleCode', 'roleName'];
    sortBy = 'roleCode';
    sortDesc = true;
    itemsPerPage = 10;
  
    filterVal = '';
    currentPage = 1;
    totalItems = 0;
  
    rolesData: object[] = [];
    originalRolesData: object[] = [];
  
  
    get totalPages() {
      return Math.ceil(this.totalItems / this.itemsPerPage);
    }
  
    update() {
      const data = this.filter(this.originalRolesData);
  
      this.totalItems = data.length;
  
      this.sort(data);
      this.rolesData = this.paginate(data);
  
    }
  
  
    filter(data) {
      const filter = this.filterVal.toLowerCase();
      return !filter ?
        data.slice(0) :
        data.filter(d => {
          return Object.keys(d)
            .filter(k => this.searchKeys.includes(k))
            .map(k => String(d[k]))
            .join('|')
            .toLowerCase()
            .indexOf(filter) !== -1 || !filter;
        });
    }
  
    sort(data) {
      console.log(data);
      data.sort((a: any, b: any) => {
        a = typeof(a[this.sortBy]) === 'string' ? a[this.sortBy].toUpperCase() : a[this.sortBy];
        b = typeof(b[this.sortBy]) === 'string' ? b[this.sortBy].toUpperCase() : b[this.sortBy];
  
        if (a < b) { return this.sortDesc ? 1 : -1; }
        if (a > b) { return this.sortDesc ? -1 : 1; }
        return 0;
      });
    }
  
    paginate(data) {
      const itemsPerPage = parseInt(String(this.itemsPerPage), 10);
      const offset = (this.currentPage - 1) * itemsPerPage;
  
      return data.slice(offset, offset + itemsPerPage);
    }
  
    setSort(key) {
      if (this.sortBy !== key) {
        this.sortBy = key;
        this.sortDesc = false;
      } else {
        this.sortDesc = !this.sortDesc;
      }
  
      this.currentPage = 1;
      this.update();
    }
  
  
    ngOnInit() {
      this.getAllRoleDetails();
    }
  
    addRole(){
      this._router.navigate(['roles/add-role']);
    }
  
    getAllRoleDetails(){
      this._auth.getAllRoles()
      .subscribe(
        data => {
          console.log(data);
          
          this.originalRolesData = data.slice(0);
          this.length = this.originalRolesData.length;
          console.log(this.originalRolesData);
          this.update();
        },
        error => {
          console.log(error);
          this.cantFetchRoleDetails = true;
        });
    }
  
    removeRole(rId){
      this._auth.removeRole(rId)
        .subscribe(
          res => {
            console.log(res);
            this.RemoveRole = true;
            this.ngOnInit();
          },
          err => {
            console.log(err);
            this.cantRemoveRole = true;
          }
        )
    }
  
    cantRemoveFeatureAlert(){
      this.cantRemoveRole=false;
    }
  
    RemoveFeatureAlert(){
      this.RemoveRole=false;
    }

}
