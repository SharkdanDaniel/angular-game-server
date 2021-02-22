import { ModalConfirmComponent } from './../../shared/components/modal-confirm/modal-confirm.component';
import { Item } from './../../core/models/item';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  TableColumn,
  TableAction,
} from './../../shared/modules/table/table-models.model';
import { take, map } from 'rxjs/operators';
import { ItemsService } from './../../core/services/items.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent implements OnInit {
  items: Item[] = [];
  pageSize = 4;

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
  // count: number;

  constructor(
    private itemsService: ItemsService,
    protected ngxSpinner: NgxSpinnerService,
    private modalService: NgbModal,
    private snackBar: SnackbarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAll();
    // this.itemsService
    //   .getItems()
    //   .pipe(take(1))
    //   .subscribe((data) => {
    //     this.items = data.availableItems;
    //     this.count = this.items.length;
    //     console.log(data);
    //   });
  }
  getAll() {
    this.itemsService.getItems().subscribe((res: any) => {
      // this.collectionSize = res.length;
      this.items = res;
      console.log(res)
      // this.usersBkp = res;
      // this.getServersName();
      // this.getPermissionName();
      this.columns = [
        {
          displayName: 'Nome',
          columnName: 'name',
        },
        {
          displayName: 'Vida',
          columnName: 'health',
          className: 'text-center'
        },
        {
          displayName: 'Colete',
          columnName: 'vest',
          className: 'text-center'
        },

        {
          displayName: 'Experiência',
          columnName: 'experience',
          className: 'text-center'
        },
        {
          displayName: 'Fome',
          columnName: 'hungry',
          className: 'text-center'
        },
        {
          displayName: 'Dinheiro',
          columnName: 'money',
          className: 'text-center'
        },
        {
          displayName: 'Status',
          columnName: 'statusPoint',
          className: 'text-center'
        },
        {
          displayName: 'Inicial',
          columnName: 'isInitial',
          className: 'text-center'
        },
        {
          displayName: 'Quantidade Inicial',
          columnName: 'quantityInitial',
          className: 'text-center'
        },
        {
          displayName: 'Virtual',
          columnName: 'isVirtual',
          className: 'text-center'
        },
      ];
    });
  }

  // getServersName() {
  //   let names = this.users.map((el: any) => {
  //     return el.server ? el.server.name : 'Nenhum';
  //   });
  //   return names;
  // }

  // getPermissionName() {
  //   let names = this.users.map((el: any) => {
  //     return el.permission <= 0
  //       ? 'Moderador'
  //       : el.permission == 1
  //       ? 'Administrador'
  //       : 'Administrador Global';
  //   });
  //   return names;
  // }

  openModal(id: string) {
    const modalRef = this.modalService.open(ModalConfirmComponent, {
      centered: true,
      windowClass: 'h-75',
    });
    modalRef.componentInstance.title = 'Excluir Item';
    modalRef.componentInstance.body =
      'Tem certeza que deseja excluir este item?';
    modalRef.componentInstance.button = 'danger';
    modalRef.componentInstance.action = 'Excluir';
    modalRef.result.then((res) => {
      if (res) {
        this.delete(id);
      }
    });
  }

  delete(id: string) {
    this.itemsService.deleteItem(id).subscribe((res) => {
      this.items.forEach((val, index, arr) => {
        if (val.id === id) {
          this.items.splice(
            this.items.findIndex((a) => a.id === id),
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
      return this.router.navigate(['/items/update', ev.item.id]);
    }
    if (ev.action === 'delete') {
      return this.openModal(ev.item.id);
    }
  }
}
