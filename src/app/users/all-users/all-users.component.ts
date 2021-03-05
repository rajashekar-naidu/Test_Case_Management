import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbCalendar, NgbDate, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { CustomDateAdapter } from 'src/app/_helpers/customDateAdaptor';
import { CustomDateParserFormatter } from 'src/app/_helpers/customDateParserFormatter';
import { AppService } from 'src/app/app.service';
import { AuthService } from 'src/app/_services/auth.services';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss'],
  providers: [{provide: NgbDateAdapter, useClass: CustomDateAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}]
})
export class AllUsersComponent implements OnInit {
  isRTL: boolean;  
  cantFetchAllUserDetails:boolean;
  cantRemoveUser:boolean;
  length;
  roles:object[] = [];

  hoveredDate: NgbDate | null = null;
  singleSelectValue: any;
  fromDate: NgbDate | null;
  toDate: NgbDate | null;

  constructor(private http:HttpClient ,
    private _appService:AppService, 
    private _router:Router, 
    private _auth:AuthService,
    private calendar: NgbCalendar, 
    public formatter: NgbDateParserFormatter
    ) {
    this._appService.pageTitle = 'Users';
    this.isRTL = _appService.isRTL;
    // this.fromDate = calendar.getToday();    
   }

   // Filters

 // filterVerified = 'Any';
  filterRole = 'Any';
  filterStatus = 'Any';
  filterStartDate = 'Any';

  // Table

  // Options
  searchKeys = ['id', 'name', 'email'];
  sortBy = 'id';
  sortDesc = true;
  itemsPerPage = 10;

  filterVal = '';
  currentPage = 1;
  totalItems = 0;

  usersData: object[] = [];
  originalUsersData: object[] = [];


  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }



  get totalPages() {
    return Math.ceil(this.totalItems / this.itemsPerPage);
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
  //   if(this._auth.getRole()==="User")
  //   this._router.navigate(['/shorturl']);
  // if(this._auth.getRole()===false)
  //   this._router.navigate(['/']);
  this.getAllUserDetails();
    this.getRoleByID();
  }
  
  addUser(){
    this._router.navigate(['users/add-user']);
  }

  getAllUserDetails(){
    this._auth.getAllUsers()
    .subscribe(
      data => {
        this.originalUsersData = data.results.slice(0);
        this.length = this.originalUsersData.length;
        console.log(this.originalUsersData);
        this.update();
      },
      error => {
        console.log(error);
        this.cantFetchAllUserDetails = true;
      });
  }

  getRoleByID(){
    this._auth.getAllRoles()
      .subscribe(
        data=>{
          console.log(data);
          this.roles = data || [];
        },
        error=>{
          console.log(error);
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
