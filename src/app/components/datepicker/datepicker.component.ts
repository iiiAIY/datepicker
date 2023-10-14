import {Component, forwardRef, Input, OnInit, Provider} from '@angular/core';
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
import {D} from "@angular/cdk/keycodes";
import {ControlValueAccessor, FormControlName, FormGroup, NG_VALUE_ACCESSOR} from "@angular/forms";

const CONTROL_VALUE_ACCESSOR : Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DatepickerComponent),
  multi: true
}

@Component({
  selector: 'datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  providers: [CONTROL_VALUE_ACCESSOR]
})
export class DatepickerComponent implements ControlValueAccessor {

  public currentDate : Date | undefined;
  private _onChange! : (currentDate : Date) => void;
  public _onTouched! : () => void;

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

  public writeValue(value: Date): void {
    this.currentDate = value;
  }

  public registerOnChange(fn: (value: Date) => void): void {
    this._onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  setDate (event: MatDatepickerInputEvent<Date>) {
    const value = event.target.value!;
    this._onChange(value)
  }
}
