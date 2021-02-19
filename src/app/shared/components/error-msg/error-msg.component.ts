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

  // get errorMsg() {
  //   for (const propertyname in this.control.errors) {
  //     if (
  //       this.control.errors.hasOwnProperty(propertyname) &&
  //       this.control.touched
  //     ) {
  //       return FormValidation.getErrorMsg(
  //         this.label,
  //         propertyname,
  //         this.control.errors[propertyname]
  //       );
  //     }
  //   }
  //   return null;
  // }

  get errorMsg() {
    for (const propertyName in this.control.errors) {
      if (
        this.control.errors.hasOwnProperty(propertyName) &&
        this.control.touched
      ) {
        return this.getErrorMsg(
          this.label,
          propertyName,
          this.control.errors[propertyName]
        );
      }
    }
    return null;
  }

  getErrorMsg(fieldname: string, validatorName: string, validatorValue?: any) {
    const config = {
      required: `${fieldname} é obrigatório.`,
      minlength: `${fieldname} precisa ter no mínimo ${validatorValue.requiredLength}.`,
      maxlength: `${fieldname} precisa ter no máximo ${validatorValue.requiredLength}.`,
      email: `Email inválido.`,
      equalTo: `As senhas estão diferentes`,
    };
    return config[validatorName];
  }
}
