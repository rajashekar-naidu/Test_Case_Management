import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-addrunlog',
  templateUrl: './addrunlog.component.html',
  styleUrls: ['./addrunlog.component.scss']
})
export class AddrunlogComponent implements OnInit {
  addRunlogForm:FormGroup;
  emptyForm:boolean;
  successful:boolean;

  constructor(private _appService:AppService, private _formBuilder:FormBuilder) {
    this._appService.pageTitle = 'add-Runlog';
   }

  ngOnInit() {
    this.addRunlogForm = this._formBuilder.group({
      run_log:['',Validators.required],
      test_case_passed:['',Validators.required],
      test_case_failed : ['', Validators.required],
      comment : ['', Validators.required],
      image_or_attachment : ['', Validators.required],
    });
  }

  get formControls() { return this.addRunlogForm.controls; }
  
  onSubmit() {    
    if (this.addRunlogForm.invalid) {
      console.log(this.addRunlogForm.value);
      this.emptyForm=true;
      return;
    }
    console.log(this.addRunlogForm.value);
    this.successful=true;
  }

  closeEmptyFormAlert(){
    this.emptyForm=false;
  }

  closeSuccessfulAlert(){
    this.successful=false;
  }
}
