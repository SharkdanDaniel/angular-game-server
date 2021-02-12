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
export class UsersComponent extends TableComponent implements OnInit {
  // users: any[] = [];
  // usersBkp: any[] = [];

  // showBody = true;
  // page = 1;
  // pageSize = 4;
  // collectionSize = 0;

  constructor(
    protected ngxSpinner: NgxSpinnerService,
    private userService: UserService,
    protected modalService: NgbModal,
    protected snackBar: SnackbarService
  ) {
    super(ngxSpinner, modalService, snackBar);
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.userService.getUsers().subscribe((res: any) => {
      this.collectionSize = res.length;
      this.data = res;
      this.dataBkp = res;
      // this.data = res.slice(
      //   (this.page - 1) * this.pageSize,
      //   (this.page - 1) * this.pageSize + this.pageSize
      // );
      // this.ngxSpinner.hide();
    });
  }

  // refreshUsers() {
  //   this.ngxSpinner.show('table');
  //   this.showBody = false;
  //   setTimeout(() => {
      // this.users = this.usersBkp.slice(
      //   (this.page - 1) * this.pageSize,
      //   (this.page - 1) * this.pageSize + this.pageSize
      // );
  //     this.showBody = true;
  //     this.ngxSpinner.hide('table');
  //   }, 300);
  // }

  // searchUser(ev) {
  //   let value = ev;
  //   if (value.trim() != '') {
  //     this.ngxSpinner.show('table');
  //     setTimeout(() => {
  //       this.users = this.usersBkp.filter((user: any) => {
  //         this.ngxSpinner.hide('table');
  //         return user.name.toLowerCase().indexOf(value.toLowerCase()) > -1;
  //       });
  //     }, 200);
  //   }
  // }

  // onKey(ev) {
  //   let value = ev.target.value;
  //   if (value == '') {
  //     this.refreshUsers();
  //   }
  // }

  // openModal(id: string) {
  //   const modalRef = this.modalService.open(ModalConfirmComponent, {
  //     centered: true,
  //     windowClass: 'h-75',
  //   });
  //   modalRef.componentInstance.title = 'Excluir Usuário';
  //   modalRef.componentInstance.body =
  //     'Tem certeza que deseja excluir este usuário?';
  //   modalRef.componentInstance.button = 'danger';
  //   modalRef.componentInstance.action = 'Excluir';
  //   modalRef.result.then((res) => {
  //     if (res) {
  //       this.delete(id);
  //     }
  //   });
  // }

  // delete(id: string) {
  //   this.userService.deleteUser(id).subscribe((res) => {
  //     this.users.forEach((val, index, arr) => {
  //       if (val.id === id) {
  //         this.users.splice(
  //           this.users.findIndex((a) => a.id === id),
  //           1
  //         );
  //         if (Object.is(arr.length - 1, index)) {
  //           this.getAll();
  //         }
  //       }
  //     });
  //     console.log('Usuário deletado', res);
  //     this.snackBar.showMessage('Usuário excluído com sucesso!');
  //   }),
  //     (err) => {
  //       console.log(err);
  //       this.snackBar.showMessage(
  //         'Não foi possível excluir este usuário',
  //         true
  //       );
  //     };
  // }
}
