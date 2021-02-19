import { ServersService } from './../../../core/services/servers.service';
import { ModalConfirmComponent } from './../../../shared/components/modal-confirm/modal-confirm.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { take } from 'rxjs/operators';
import { BaseFormComponent } from 'src/app/shared/components/base-form/base-form.component';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from './../../../core/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent extends BaseFormComponent implements OnInit {
  user: any;
  editing = false;

  constructor(
    private userService: UserService,
    private serverService: ServersService,
    private formBuilder: FormBuilder,
    private router: Router,
    private ngxSpinner: NgxSpinnerService,
    private route: ActivatedRoute,
    protected modal: NgbModal,
    protected snackBar: SnackbarService
  ) {
    super(snackBar, modal);
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      permission: [null, [Validators.required]],
      serverId: [this.serverService.getServerID()],
    });
    this.user = this.userService.getUser();
    if (this.route.snapshot.paramMap.get('id')) {
      this.editing = true;
      const id = this.route.snapshot.paramMap.get('id');
      this.userService.getUsersById(id).subscribe((user) => {
        this.form = this.formBuilder.group({
          name: [user.name, [Validators.required]],
          email: [user.email, [Validators.required, Validators.email]],
          password: [user.password, [Validators.required]],
          permission: [user.permission, [Validators.required]],
          serverId: [user.server ? user.server.id : '']
        });
        console.log(this.form)
      });
    } else {
      this.ngxSpinner.show();
      setTimeout(() => {
        this.ngxSpinner.hide();
      }, 100);
    }
  }

  // openModal() {
  //   const modalRef = this.modal.open(ModalConfirmComponent, {
  //     centered: true,
  //     windowClass: 'h-75',
  //   });
  //   modalRef.componentInstance.title = 'Confirmar alterações';
  //   modalRef.componentInstance.body =
  //     'Você tem certeza que deseja alterar os dados?';
  //   modalRef.componentInstance.action = 'Salvar alterações';
  //   modalRef.result.then((res) => {
  //     if (res) {
  //       this.submit();
  //       this.submiting = true;
  //     }
  //   });
  // }

  submit() {
    let service
    if (this.editing) {
      service = this.userService.updateUser(this.form.value);
    } else {
      service = this.userService.createUser(this.form.value);
    }
    service.subscribe((res) => {
      this.snackBar.showMessage(
        `${
          this.editing
            ? 'As alterações foram salvas com sucesso!'
            : 'Usuário adicionado com sucesso!'
        }`
      );
      console.log('sucesso', res);
      this.router.navigate(['/users']);
    }),
      (err) => {
        console.log(err);
        this.snackBar.showMessage(
          `${
            this.editing
              ? 'Erro ao salvar as alterações!'
              : 'Não foi possível adicionar o usuário!'
          }`
        );
      };
    }
}
