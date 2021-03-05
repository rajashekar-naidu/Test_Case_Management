import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-add-report',
  templateUrl: './add-report.component.html',
  styleUrls: ['./add-report.component.scss']
})
export class AddReportComponent implements OnInit {
  addReportForm:FormGroup;
  emptyForm:boolean;
  successful:boolean;

  constructor(private _appService:AppService, private _formBuilder:FormBuilder) {
    this._appService.pageTitle = 'add-Report';
   }

  statuses: any = ['Resolved', 'Unresolved'];

  ngOnInit() {
    this.addReportForm = this._formBuilder.group({
      project_name:['',Validators.required],
      tester_id:['',Validators.required],
      expected_result : ['', Validators.required],
      actual_result : ['', Validators.required],
      no_of_testCase_passed: ['', Validators.required],
      no_of_testCase_failed : ['', Validators.required],
      bug_id : ['', Validators.required],
      jira_link : ['', Validators.required],
      bug_id_status: ['', Validators.required],
      comments : ['', Validators.required],
    });
  }

  get formControls() { return this.addReportForm.controls; }

  onSubmit() {    
    if (this.addReportForm.invalid) {
      console.log(this.addReportForm.value);
      this.emptyForm=true;
      return;
    }
    console.log(this.addReportForm.value);
    this.successful=true;
  }

  closeEmptyFormAlert(){
    this.emptyForm=false;
  }

  closeSuccessfulAlert(){
    this.successful=false;
  }

}
