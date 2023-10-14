import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {datepickerValidator} from "./components/validators/datepicker.validator";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy{
  private onDestroy$ : Subject<void> = new Subject()
  private isFirstStartDate : boolean = false;
  public myForm : FormGroup;

  constructor() {
    this.myForm = this.initForm();
  }

  ngOnInit() {
    this.myForm.controls['startDate'].valueChanges
      .pipe(
        takeUntil(this.onDestroy$)
      )
      .subscribe(() => {
        this.isFirstStartDate = true;
        this.myForm.setValidators([datepickerValidator('startDate','endDate',this.isFirstStartDate)])
    })
    this.myForm.controls['endDate'].valueChanges
      .pipe(
        takeUntil(this.onDestroy$)
      )
      .subscribe(() => {
        this.isFirstStartDate = false;
        this.myForm.setValidators([datepickerValidator('startDate','endDate',this.isFirstStartDate)])
    })

  }

  private initForm(): FormGroup {
    const fg : FormGroup = new FormGroup({
      startDate : new FormControl<Date | null>(null),
      endDate : new FormControl<Date | null>(null),
    })
    return fg;
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
