import { ModalConfirmComponent } from './../../shared/components/modal-confirm/modal-confirm.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserCreateComponent } from './../../pages/users/user-create/user-create.component';
import { BaseFormComponent } from 'src/app/shared/components/base-form/base-form.component';
import { Injectable } from '@angular/core';
import {
  CanDeactivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormGuard implements CanDeactivate<BaseFormComponent> {
  constructor(private modal: NgbModal) {}

  openModal() {
    const modalRef = this.modal.open(ModalConfirmComponent, {
      centered: true,
      windowClass: 'h-75',
    });
    modalRef.componentInstance.title = 'Confirmação ';
    modalRef.componentInstance.body =
      'Tem certeza que deseja sair desta página sem salvar as informações?';
    modalRef.componentInstance.action = 'Confirmar';
    return modalRef.result.then((res) => {
      if (res) {
        return true;
      }
      return false;
    });
  }

  canDeactivate(
    component: BaseFormComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (component.form.dirty && !component.submiting) {      
      return this.openModal();
    } else {
      return true;
    }
  }
}
