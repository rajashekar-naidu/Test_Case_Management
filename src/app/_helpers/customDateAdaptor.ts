import { Injectable } from "@angular/core";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

@Injectable()
export class CustomDateAdapter {
  fromModel(value: string): NgbDateStruct
  {
     if (!value)
      return null
     let parts=value.split('/');
     return {year:+parts[0],month:+parts[1],day:+parts[2]}
  }

  toModel(date: NgbDateStruct): string // from internal model -> your mode
  {
    return date?date.year+"/"+('0'+date.month).slice(-2)
           +"/"+('0'+date.day).slice(-2):null
  }
}