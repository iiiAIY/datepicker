import {Component, Input, OnInit} from '@angular/core';
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
import {D} from "@angular/cdk/keycodes";

@Component({
  selector: 'datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit {

  public _placeholderDate : string = '';
  public _datepicker : boolean = false;
  public _currentDate : number = new Date().getFullYear();
  public _minDate : Date | null = null;
  public _maxDate : Date | null = null;

  @Input() set placeholderDate (value : string) {
    this._placeholderDate = value;
  }

  @Input() set datePicker (value : boolean) {
    this._datepicker = value;
  }

  @Input() set minRangeDateTimeFromCurrentYear (value : string | number) {
    if (typeof value === "number") {
      this._minDate = new Date(this._currentDate - value, 0, 1);
    } else {
      const year : number = +value.split(' ')[0];
      this._minDate = new Date(this._currentDate - year, 0, 1);
    }
  }

  @Input() set maxRangeDateTimeFromCurrentYear (value : string | number) {
    if (typeof value === "number") {
      this._maxDate = new Date(this._currentDate + value, 11, 31);
    } else {
      const year : number = +value.split(' ')[0];
      this._maxDate = new Date(this._currentDate + year, 11, 31);
    }
  }


  constructor() { }

  ngOnInit(): void {
  }

  setDate (event: MatDatepickerInputEvent<Date>) {
    // this.minDate = event.target.value!;
    // console.log(this.minDate)
  }
}
