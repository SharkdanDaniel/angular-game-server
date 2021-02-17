import { Router } from '@angular/router';
import {
  TableColumn,
  TableAction,
} from './../../shared/modules/table/table-models.model';
import { TableComponent } from './../../shared/modules/table/table.component';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { ModalConfirmComponent } from './../../shared/components/modal-confirm/modal-confirm.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { take } from 'rxjs/operators';
import { UserService } from './../../core/services/user.service';
import { Component, OnInit } from '@angular/core';
import { SpinnerService } from 'src/app/core/services/spinner.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  // usersBkp: any[] = [];

  // showBody = true;
  // page = 1;
  pageSize = 4;
  // collectionSize = 0;

  columns: TableColumn[];
  actions: TableAction[] = [
    {
      iconClass: 'edit',
      eventName: 'edit',
    },
    {
      iconClass: 'delete',
      eventName: 'delete',
    },
  ];

  constructor(
    protected ngxSpinner: NgxSpinnerService,
    private userService: UserService,
    protected modalService: NgbModal,
    protected snackBar: SnackbarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.userService.getUsers().subscribe((res: any) => {
      // this.collectionSize = res.length;
      this.users = res;
      // this.usersBkp = res;
      this.getServersName();
      this.getPermissionName();
      this.columns = [
        {
          displayName: 'Nome',
          columnName: 'name',
        },
        {
          displayName: 'Email',
          columnName: 'email',
        },
        {
          displayName: 'Servidor',
          columnOptional: this.getServersName(),
        },

        {
          displayName: 'Permissão',
          columnOptional: this.getPermissionName(),
        },
      ];
    });
  }

  getServersName() {
    let names = this.users.map((el: any) => {
      return el.server ? el.server.name : 'Nenhum';
    });
    return names;
  }

  getPermissionName() {
    let names = this.users.map((el: any) => {
      return el.permission < 1
        ? 'Moderador'
        : 'Administrador'
    });
    console.log(names)
    return names;
  }

  openModal(id: string) {
    const modalRef = this.modalService.open(ModalConfirmComponent, {
      centered: true,
      windowClass: 'h-75',
    });
    modalRef.componentInstance.title = 'Excluir Usuário';
    modalRef.componentInstance.body =
      'Tem certeza que deseja excluir este usuário?';
    modalRef.componentInstance.button = 'danger';
    modalRef.componentInstance.action = 'Excluir';
    modalRef.result.then((res) => {
      if (res) {
        this.delete(id);
      }
    });
  }

  delete(id: string) {
    this.userService.deleteUser(id).subscribe((res) => {
      this.users.forEach((val, index, arr) => {
        if (val.id === id) {
          this.users.splice(
            this.users.findIndex((a) => a.id === id),
            1
          );
          if (Object.is(arr.length - 1, index)) {
            this.getAll();
          }
        }
      });
      console.log('Usuário deletado', res);
      this.snackBar.showMessage('Usuário excluído com sucesso!');
    }),
      (err) => {
        console.log(err);
        this.snackBar.showMessage(
          'Não foi possível excluir este usuário',
          true
        );
      };
  }

  onAction(ev: any) {
    if (ev.action === 'edit') {
      return this.router.navigate(['/users/update', ev.item.id]);
    }
    if (ev.action === 'delete') {
      return this.openModal(ev.item.id);
    }
  }
}
