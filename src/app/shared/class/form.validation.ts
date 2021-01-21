import { FormControl, FormGroup } from '@angular/forms';

export class FormValidation {
  static getErrorMsg(
    fieldname: string,
    validatorName: string,
    validatorValue?: any
  ) {
    const config = {
      required: `${fieldname} é obrigatório.`,
      minLength: `${fieldname} precisa ter no mínimo ${validatorValue.required}.`,
      maxLength: `${fieldname} precisa ter no máximo ${validatorValue.required}.`,
      email: `Email inválido.`,
    };
    return config[validatorName];
  }
}
