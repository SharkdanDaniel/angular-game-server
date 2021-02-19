import { FormControl, FormGroup } from '@angular/forms';

export class FormValidation {

  static equalsTo(otherField: string) {
    const validator = (formControl: FormControl) => {
      if (otherField == null) {
        throw new Error('É necessário informar um campo.')
      }

      if (!formControl.root || !(<FormGroup>formControl.root).controls) {
        return null;
      }

      const field = (<FormGroup>formControl.root).get(otherField);

      if (!field) {
        throw new Error('É necessário informar um campo válido.')
      }

      if (field.value !== formControl.value) {
        return { equalsTo : otherField };
      }

      return null;
    };
    return validator;
  }

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
