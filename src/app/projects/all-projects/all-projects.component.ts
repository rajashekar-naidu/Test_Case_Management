import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbCalendar, NgbDate, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from 'src/app/app.service';
import { CustomDateAdapter } from 'src/app/_helpers/customDateAdaptor';
import { CustomDateParserFormatter } from 'src/app/_helpers/customDateParserFormatter';
import { AuthService } from 'src/app/_services/auth.services';

@Component({
  selector: 'app-all-projects',
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.scss'],
  providers: [{provide: NgbDateAdapter, useClass: CustomDateAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}]
})
export class AllProjectsComponent implements OnInit {
  isRTL: boolean;
  users:any;
  cantFetchAllUserDetails:boolean;
  cantRemoveUser:boolean;
  length;

  hoveredDate: NgbDate | null = null;
  singleSelectValue: any;
  fromDate: NgbDate | null;
  toDate: NgbDate | null;

  constructor(private http: HttpClient, private _appService:AppService, 
    private _router:Router, private _auth:AuthService,
    private calendar: NgbCalendar, 
    public formatter: NgbDateParserFormatter
    ) { 
    this._appService.pageTitle = 'Projects';
    this.isRTL = _appService.isRTL;
    this.loadData();
  }

   // Filters

 // filterVerified = 'Any';
 //filterRole = 'Any';
 // filterStatus = 'Any';
 filterStartDate = 'Any';
 filterEndDate = 'Any';



  // Table

  // Options
  dataUrl = 'assets/json/pages_users_list.json';
  searchKeys = ['id', 'account', 'email', 'name'];
  sortBy = 'id';
  sortDesc = true;
  perPage = 10;

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




  loadData() {
    this.http.get(this.dataUrl)
      .subscribe((data: any) => {
        this.originalUsersData = data.slice(0);
        this.update();
      });
  }

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
  }

  addProject(){
    this._router.navigate(['/projects/add-project']);
  }

  viewProject(){
    this._router.navigate(['/projects/view']);
  }


}
