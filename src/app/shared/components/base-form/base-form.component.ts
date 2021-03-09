import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { CrudService } from 'src/app/shared/classes/crud-service';
import { LoginService } from './../../../core/services/login.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalConfirmComponent } from './../modal-confirm/modal-confirm.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Component, OnInit, Injector } from '@angular/core';

@Component({
  selector: 'app-base-form',
  template: '<div></div>'
})
export abstract class BaseFormComponent<T> implements OnInit {
  form: FormGroup;
  confirmPassword: FormControl;
  editing = false;
  submiting = false;

  private successAdded: string
  private errorAdded: string
  private navigate: any[];

  protected formBuilder: FormBuilder;
  protected router: Router;
  protected route: ActivatedRoute;
  protected snackBar: SnackbarService;
  protected modal: NgbModal;
  protected ngxSpinner: NgxSpinnerService;
  protected loginService: LoginService;

  constructor(
    protected injector: Injector,
    protected crudService: CrudService<T>
  ) {
    this.snackBar = this.injector.get(SnackbarService);
    this.modal = this.injector.get(NgbModal);
    this.formBuilder = this.injector.get(FormBuilder);
    this.router = this.injector.get(Router);
    this.route = this.injector.get(ActivatedRoute);
    this.ngxSpinner = this.injector.get(NgxSpinnerService);
    this.loginService = this.injector.get(LoginService);
  }
  ngOnInit(): void {
    this.buildForm();
  }
  // abstract submit();

  abstract buildForm();

  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      // this.submit();
      this.submiting = true;
      let service;
      if (this.editing) {
        service = this.crudService.update(this.form.value);
      } else {
        service = this.crudService.create(this.form.value);
      }
      service
        .pipe(
          catchError(err => {
            if (err) {
              this.ngxSpinner.hide();
              this.submiting = false;
              console.log(err);
              this.snackBar.showMessage(
                `${
                  this.editing
                    ? 'Erro ao salvar as alterações!'
                    : this.errorAdded
                }`,
                true
              );
            }
            return EMPTY;
          })
        )
        .subscribe(res => {
          this.snackBar.showMessage(
            `${
              this.editing
                ? 'As alterações foram salvas com sucesso!'
                : this.successAdded
            }`
          );
          console.log('sucesso', res);
          this.router.navigate(this.navigate);
        });
    } else {
      console.log('formulário inválido');
      this.snackBar.showMessage('Verifique os erros e tente novamente!', true);
    }
  }

  openModal() {
    const modalRef = this.modal.open(ModalConfirmComponent, {
      centered: true,
      windowClass: 'h-75'
    });
    modalRef.componentInstance.title = 'Confirmar alterações';
    modalRef.componentInstance.body =
      'Você tem certeza que deseja alterar os dados?';
    modalRef.componentInstance.action = 'Salvar alterações';
    modalRef.result.then(res => {
      if (res) {
        this.onSubmit();
      }
    });
  }

  applyErrCss(field: string) {
    if (this.checkInvalidTouched(field)) {
      return {
        'is-invalid': this.checkInvalidTouched(field)
      };
    } else {
      return {
        'is-valid': this.checkValidTouched(field)
      };
    }
  }

  applyEqualCss(field: string) {
    if (this.checkNotEqualTo(field)) {
      return {
        'is-invalid': this.checkNotEqualTo(field)
      };
    } else {
      return {
        'is-valid': this.checkEqualTo(field)
      };
    }
  }

  protected set setSuccessAdded(value: string) {
    this.successAdded = value;
  }

  protected set setErrorAdded(value: string) {
    this.errorAdded = value;
  }

  protected set setNavigate(value: any[]) {
    this.navigate = value;
  }

  // PRIVATE METHODS

  private checkEqualTo(field: string) {
    return this.confirmPassword.valid && this.confirmPassword.touched;
  }

  private checkNotEqualTo(field: string) {
    return !this.confirmPassword.valid && this.confirmPassword.touched;
  }

  private checkInvalidTouched(field: string) {
    return !this.form.get(field).valid && this.form.get(field).touched;
  }

  private checkValidTouched(field: string) {
    return this.form.get(field).valid && this.form.get(field).touched;
  }
}
