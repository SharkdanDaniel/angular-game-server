import { CustomValidators } from 'ng2-validation';
import { ModalConfirmComponent } from './../modal-confirm/modal-confirm.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-base-form',
  template: '<div></div>',
})
export abstract class BaseFormComponent implements OnInit {
  form: FormGroup;
  confirmPassword: FormControl;
  submiting = false;
  editing = false;

  constructor(protected snackBar: SnackbarService, protected modal: NgbModal) {}
  ngOnInit(): void {}

  abstract submit();

  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.submiting = true;
      this.submit();
    } else {
      console.log('formulário inválido');
      this.snackBar.showMessage('Verifique os erros e tente novamente!', true)
    }
  }

  openModal() {
    const modalRef = this.modal.open(ModalConfirmComponent, {
      centered: true,
      windowClass: 'h-75',
    });
    modalRef.componentInstance.title = 'Confirmar alterações';
    modalRef.componentInstance.body =
      'Você tem certeza que deseja alterar os dados?';
    modalRef.componentInstance.action = 'Salvar alterações';
    modalRef.result.then((res) => {
      if (res) {
        this.submit();
        this.submiting = true;
      }
    });
  }

  checkEqualTo(field:string) {
    return this.confirmPassword.valid && this.confirmPassword.touched;
  }

  checkNotEqualTo(field:string) {
    return !this.confirmPassword.valid && this.confirmPassword.touched;
  }

  checkInvalidTouched(field: string) {
    return !this.form.get(field).valid && this.form.get(field).touched;
  }

  checkValidTouched(field: string) {
    return this.form.get(field).valid && this.form.get(field).touched;
  }

  applyErrCss(field: string) {
    if (this.checkInvalidTouched(field)) {
      return {
        'is-invalid': this.checkInvalidTouched(field),
      };
    } else {
      return {
        'is-valid': this.checkValidTouched(field)
      }
    }
  }

  applyEqualCss(field: string) {
    if (this.checkNotEqualTo(field)) {
      return {
        'is-invalid': this.checkNotEqualTo(field),
      };
    } else {
      return {
        'is-valid': this.checkEqualTo(field)
      }
    }
  }


}
