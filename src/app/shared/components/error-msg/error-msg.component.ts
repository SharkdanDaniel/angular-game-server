import { FormValidation } from './../../class/form.validation';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-error-msg',
  templateUrl: './error-msg.component.html',
  styleUrls: ['./error-msg.component.scss'],
})
export class ErrorMsgComponent implements OnInit {
  @Input() control: FormControl;
  @Input() label: string;

  constructor() {}

  ngOnInit(): void {}

  get errorMsg() {
    for (const propertyname in this.control.errors) {
      if (
        this.control.errors.hasOwnProperty(propertyname) &&
        this.control.touched
      ) {
        return FormValidation.getErrorMsg(
          this.label,
          propertyname,
          this.control.errors[propertyname]
        );
      }
    }
    return null;
  }
}
