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
      projectName:['',Validators.required],
      id:['',Validators.required],
      description : ['', Validators.required],
      fromDate : ['', Validators.required],
      toDate : ['', Validators.required],
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
    console.log(this.addProjectForm.value);
    if (this.addProjectForm.invalid) {
      this.emptyForm=true;
      return;
    }
    console.log(this.addProjectForm.value);
    this.successful=true;
    // this._auth.registerUser(this.addProjectForm.value)
    // .subscribe(
    //     res => {
    //       console.log(res);
         // this._router.navigate(['/confirm-page']);
        // },
        // err => {
          // console.log(err.error.errors.email);
          // if(err.error.errors.email === "that email is already registered")
          //   this.emailAlreadyRegistered=true;

          // if(err.name === "HttpErrorResponse")
          //   this.serverError=true;

//         })
//     this.addUserForm.reset();
  }

closeEmptyFormAlert(){
  this.emptyForm=false;
}

closeSuccessfulAlert(){
  this.successful=false;
}


}
