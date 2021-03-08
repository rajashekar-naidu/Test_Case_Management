import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { AuthService } from 'src/app/_services/auth.services';

@Component({
  selector: 'app-all-features',
  templateUrl: './all-features.component.html',
  styleUrls: ['./all-features.component.scss']
})
export class AllFeaturesComponent implements OnInit {
  isRTL: boolean;  
  cantFetchFeatureDetails:boolean;
  cantRemoveFeature:boolean;
  RemoveFeature:boolean;
  length;

  constructor(private _appService:AppService, 
    private _router:Router, 
    private _auth:AuthService,) {
      this._appService.pageTitle = 'Features';
      this.isRTL = _appService.isRTL;
   }

   searchKeys = ['id','featureCode', 'featureName', 'moduleName', 'createdOn', 'createdBy'];
  sortBy = 'id';
  sortDesc = true;
  itemsPerPage = 10;

  filterVal = '';
  currentPage = 1;
  totalItems = 0;

  featuresData: object[] = [];
  originalFeaturesData: object[] = [];


  get totalPages() {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  update() {
    const data = this.filter(this.originalFeaturesData);
    this.totalItems = data.length;
    this.sort(data);
    this.featuresData = this.paginate(data);

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
    console.log(itemsPerPage);
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
    this.getAllFeatureDetails();
  }

  addFeature(){
    this._router.navigate(['features/add-feature']);
  }

  getAllFeatureDetails(){
    this._auth.getAllFeatures()
    .subscribe(
      data => {
        console.log(data);
        
        this.originalFeaturesData = data.slice(0);
        this.length = this.originalFeaturesData.length;
        console.log(this.originalFeaturesData);
        this.update();
      },
      error => {
        console.log(error);
        this.cantFetchFeatureDetails = true;
      });
  }

  removeFeature(fId){
    this._auth.removeFeature(fId)
      .subscribe(
        res => {
          console.log(res);
          this.RemoveFeature = true;
          this.ngOnInit();
        },
        err => {
          console.log(err);
          this.cantRemoveFeature = true;
        }
      )
  }

  cantRemoveFeatureAlert(){
    this.cantRemoveFeature=false;
  }

  RemoveFeatureAlert(){
    this.RemoveFeature=false;
  }
}
