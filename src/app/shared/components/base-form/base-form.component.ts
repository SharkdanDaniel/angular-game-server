import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-base-form',
  template: '<div></div>',
})
export abstract class BaseFormComponent implements OnInit {
  form: FormGroup;

  constructor() {}
  ngOnInit(): void {}

  abstract submit();

  onSubmit() {
    this.form.markAllAsTouched();
    console.log(this.form);
    if (this.form.valid) {
      this.submit();
    } else {
      console.log('formulário inválido');
    }
  }

  checkInvalidTouched(field: string) {
    return !this.form.get(field).valid && this.form.get(field).touched;
  }

  checkValid(field: string) {
    return this.form.get(field).valid && this.form.get(field).touched;
  }

  // checkRequired(field: string) {
  //   return (
  //     this.form.get(field).hasError('required') &&
  //     (this.form.get(field).touched || this.form.get(field).dirty)
  //   );
  // }

  // checkInvalidEmail() {
  //   let emailField = this.form.get('email');
  //   if (emailField.errors) {
  //     return emailField.errors['email'] && emailField.touched;
  //   }
  // }

  applyErrCss(field: string) {
    if (this.checkInvalidTouched(field)) {
      return {
        'is-invalid': this.checkInvalidTouched(field),
      };
    } else {
      return {
        'is-valid': this.checkValid(field)
      }
    }
  }
}
