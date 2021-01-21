import { OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

export abstract class BaseForm implements OnInit {
  form: FormGroup;

  constructor() {}

  ngOnInit(): void {}

  abstract submit();

  onSubmit() {
    if (this.form.valid) {
      this.submit();
    } else {
      console.log('formulário inválido');
    }
  }

  checkValidTouched(field: string) {
    return !this.form.get(field).valid && this.form.get(field).touched;
  }

  checkRequired(field: string) {
    return (
      this.form.get(field).hasError('required') &&
      (this.form.get(field).touched || this.form.get(field).dirty)
    );
  }

  checkInvalidEmail() {
    let emailField = this.form.get('email');
    if (emailField.errors) {
      return emailField.errors['email'] && emailField.touched;
    }
  }

  applyErrCss(field: string) {
    return {
      'invalid-feedback': this.checkValidTouched(field),
    };
  }
}
