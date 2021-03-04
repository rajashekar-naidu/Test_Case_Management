import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { AuthService } from 'src/app/_services/auth.services';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent implements OnInit {
  isRTL: boolean;  
  cantFetchAllUserDetails:boolean;
  cantRemoveUser:boolean;
  length;

  constructor(private http:HttpClient ,private _appService:AppService, private _router:Router, private _auth:AuthService) {
    this._appService.pageTitle = 'Users';
    this.isRTL = _appService.isRTL;
    //this.loadData();
    this.getAllUserDetails();
   }

   // Filters

 // filterVerified = 'Any';
  filterRole = 'Any';
  // filterStatus = 'Any';
 // filterLatestActivity = [null, null];


  // Table

  // Options
  dataUrl = 'assets/json/pages_users_list.json';
  searchKeys = ['id', 'name', 'email'];
  sortBy = 'id';
  sortDesc = true;
  perPage = 10;

  filterVal = '';
  currentPage = 1;
  totalItems = 0;

  usersData: object[] = [];
  originalUsersData: object[] = [];

  // loadData() {
  //   this.http.get(this.dataUrl)
  //     .subscribe((data: any) => {
  //       this.originalUsersData = data.slice(0);
  //       this.update();
  //     });
  // }

  get totalPages() {
    return Math.ceil(this.totalItems / this.perPage);
  }

  update() {
    const data = this.filter(this.originalUsersData);

    this.totalItems = data.length;

    this.sort(data);
    this.usersData = this.paginate(data);
  }

  filter(data) {
    const filter = this.filterVal.toLowerCase();
    return !filter ?
      data :
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
    const perPage = parseInt(String(this.perPage), 10);
    const offset = (this.currentPage - 1) * perPage;

    return data.slice(offset, offset + perPage);
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
  //   if(this._auth.getRole()==="User")
  //   this._router.navigate(['/shorturl']);
  // if(this._auth.getRole()===false)
  //   this._router.navigate(['/']);
  }
  
  addUser(){
    this._router.navigate(['users/add-user']);
  }

  getAllUserDetails(){
    this._auth.getAllUsers()
    .subscribe(
      data => {
        this.originalUsersData = data.results || [];
        this.length = this.originalUsersData.length;
        console.log(this.originalUsersData);
        this.update();
      },
      error => {
        console.log(error);
        this.cantFetchAllUserDetails = true;
      });
  }

  removeUser(uId){
    this._auth.removeUser(uId)
      .subscribe(
        res => {
          console.log(res);
          this.ngOnInit();
        },
        err => {
          console.log(err);
          this.cantRemoveUser = true;
        }
      )
  }

  cantFetchAllUserDetailsAlert(){
    this.cantFetchAllUserDetails=false;
  }

  cantRemoveUserAlert(){
    this.cantRemoveUser=false;
  }


}
