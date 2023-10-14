import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})Validator "from field to field" angular
export class AppComponent {
  public myForm : FormGroup;

  constructor() {
    this.myForm = this.initForm();
  }

  private initForm(): FormGroup {
    const fg : FormGroup = new FormGroup({
      startDate : new FormControl<Date | null>(null, [Validators.required]),
      endDate : new FormControl<Date | null>(null, [Validators.required]),
    },{})
    return fg;
  }

  log() {
    console.log(this.myForm.value)
  }
}
