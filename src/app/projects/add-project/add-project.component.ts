import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbCalendar, NgbDate, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from 'src/app/app.service';
import { CustomDateAdapter } from 'src/app/_helpers/customDateAdaptor';
import { CustomDateParserFormatter } from 'src/app/_helpers/customDateParserFormatter';
import { AuthService } from 'src/app/_services/auth.services';


@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss'],
  providers: [{provide: NgbDateAdapter, useClass: CustomDateAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}]
})
export class AddProjectComponent implements OnInit {
  cantFetchAllUserDetails:boolean;
  originalUsersData: object[] = [];
  addProjectForm:FormGroup;
  emptyForm:boolean;
  successful:boolean;
  failed:boolean;
  now = new Date();

  hoveredDate: NgbDate | null = null;
  singleSelectValue: any;
  fromDate: NgbDate | null;
  toDate: NgbDate | null;

  constructor( private _appService:AppService, 
    private _auth:AuthService, 
    private _formBuilder:FormBuilder,
    private calendar: NgbCalendar, 
    public formatter: NgbDateParserFormatter
    ) {
    this._appService.pageTitle = 'add-Project';
    this.fromDate = calendar.getToday();
   }

  ngOnInit() {
    this.getAllUserDetails();
    this.addProjectForm = this._formBuilder.group({
      nameOfProject:['',Validators.required],
      handledBy:['',Validators.required],
      projectDescription : ['', Validators.required],
      startDate : ['', Validators.required],
      endDate : ['', Validators.required],
    });
  }

  get formControls() { return this.addProjectForm.controls; }

  getAllUserDetails(){
    this._auth.getAllUsers()
    .subscribe(
      data => {
        this.originalUsersData = data.results || [];
        console.log(this.originalUsersData);
      },
      error => {
        console.log(error);
        this.cantFetchAllUserDetails = true;
      });
  }




  onSubmit() {    
    
    if (this.addProjectForm.invalid) {
      console.log(this.addProjectForm.value);
      this.emptyForm=true;
      return;
    }
    console.log(this.addProjectForm.value);
    this._auth.assignProject(this.addProjectForm.value)
    .subscribe(
        res => {
          console.log(res);
          if(res){
            this.successful=true;
          }
        },
        err => {
          if(err){
            this.failed = true;
          }
        })
    this.addProjectForm.reset();
  }

closeEmptyFormAlert(){
  this.emptyForm=false;
}

closeSuccessfulAlert(){
  this.successful=false;
}

closeFailedAlert(){
  this.failed=false;
}


}
