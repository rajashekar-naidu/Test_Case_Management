import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-add-testcase',
  templateUrl: './add-testcase.component.html',
  styleUrls: ['./add-testcase.component.scss']
})
export class AddTestcaseComponent implements OnInit {
  addTestCaseForm:FormGroup;
  emptyForm:boolean;
  successful:boolean;

  constructor(private _appService:AppService, private _formBuilder:FormBuilder) {
    this._appService.pageTitle = 'add-Test Case';
   }

  statuses: any = ['Pass', 'Fail'];

  ngOnInit() {
    this.addTestCaseForm = this._formBuilder.group({
      title:['',Validators.required],
      assigned_to_id:['',Validators.required],
      assigned_to_name : ['', Validators.required],
      descriptions : ['', Validators.required],
      status: ['', Validators.required],
      attachment : ['', Validators.required],
    });
  }
  
  get formControls() { return this.addTestCaseForm.controls; }
  
  onSubmit() {    
    if (this.addTestCaseForm.invalid) {
      console.log(this.addTestCaseForm.value);
      this.emptyForm=true;
      return;
    }
    console.log(this.addTestCaseForm.value);
    this.successful=true;
  }

  closeEmptyFormAlert(){
    this.emptyForm=false;
  }

  closeSuccessfulAlert(){
    this.successful=false;
  }

}
