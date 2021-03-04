/* tslint:disable:member-ordering */
import { Component } from '@angular/core';
import { AppService } from '../../app.service';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

const now = new Date();

const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
  one && two && two.year === one.year && two.month === one.month && two.day === one.day;

const before = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day < two.day : one.month < two.month : one.year < two.year;

const after = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day > two.day : one.month > two.month : one.year > two.year;


@Component({
  selector: 'forms-pickers', // tslint:disable-line
  templateUrl: './pickers.component.html',
  styleUrls: [
    '../../../vendor/libs/ngb-datepicker/ngb-datepicker.scss',
    '../../../vendor/libs/ngb-timepicker/ngb-timepicker.scss',
    '../../../vendor/libs/ngx-color-picker/ngx-color-picker.scss'
  ]
})
export class PickersComponent {
  isRTL: boolean;

  constructor(private appService: AppService, calendar: NgbCalendar) {
    this.appService.pageTitle = 'Date Picker';
    this.isRTL = appService.isRTL;

    //
    // Ngb Datepicker
    //

    // this.fromDate = calendar.getToday();
    // this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  //
  // Ngb Datepicker
  //

  // Single datepicker

  model: NgbDateStruct = {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate()
  };

  }
