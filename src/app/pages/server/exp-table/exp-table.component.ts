import { ExpTable } from './../../../core/models/exp-table';
import { ModalConfirmComponent } from './../../../shared/components/modal-confirm/modal-confirm.component';
import { SnackbarService } from './../../../core/services/snackbar.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  TableColumn,
  TableAction,
} from './../../../shared/modules/table/table-models.model';
import { take } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ServersService } from '../../../core/services/servers.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exp-table',
  templateUrl: './exp-table.component.html',
  styleUrls: ['./exp-table.component.scss'],
})
export class ExpTableComponent implements OnInit {
  serverId: string;
  expTables: ExpTable[] = [];
  pageSize = 4;

  columns: TableColumn[] = [
    {
      displayName: 'Título',
      columnName: 'title',
    },
    {
      displayName: 'Experiência',
      columnName: 'exp',
      className: 'text-center',
    },
    {
      displayName: 'Level',
      columnName: 'level',
      className: 'text-center',
    },
  ];

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
    private serversService: ServersService,
    private route: ActivatedRoute,
    protected ngxSpinner: NgxSpinnerService,
    private modalService: NgbModal,
    private snackBar: SnackbarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.serverId = this.route.snapshot.paramMap.get('id');
    this.serversService.getById(this.serverId).subscribe((data) => {
      this.expTables = data.expTable.sort((a, b) => (a.exp > b.exp ? 1 : -1));
    });
  }

  openModal(id: string) {
    const modalRef = this.modalService.open(ModalConfirmComponent, {
      centered: true,
      windowClass: 'h-75',
    });
    modalRef.componentInstance.title = 'Excluir debuff';
    modalRef.componentInstance.body =
      'Tem certeza que deseja excluir este debuff?';
    modalRef.componentInstance.button = 'danger';
    modalRef.componentInstance.action = 'Excluir';
    modalRef.result.then((res) => {
      if (res) {
        this.delete(id);
      }
    });
  }

  delete(expId: string) {
    const id = '00000000-0000-0000-0000-000000000000';

    this.expTables = this.expTables.reduce((count, arr) => {
      if (arr.id !== expId) {
        arr.id = id;
        count.push(arr);
      }
      return count;
    }, []);
    this.serversService
      .updateExpTable(this.serverId, this.expTables)
      .subscribe((res) => {
        this.snackBar.showMessage('Tabela de xp excluída com sucesso!');
        console.log('expTable excluído', res);
        this.router.navigate(['/server/', this.serverId, 'exptable']);
      });
    // this.diseaseService.deleteDisease(id).subscribe((res) => {
    //   this.diseases = this.diseases.filter((el) => el.id != id);
    //   console.log('Item deletado', res);
    //   this.getAll();
    //   this.snackBar.showMessage('Debuff excluído com sucesso!');
    // }),
    //   (err) => {
    //     console.log(err);
    //     this.snackBar.showMessage('Não foi possível excluir este debuff', true);
    //   },
    //   (res) => {};
  }

  onAction(ev: any) {
    if (ev.action === 'edit') {
      return this.router.navigate([
        `/server/${this.serverId}/exptable/edit/${ev.item.id}`,
      ]);
    }
    if (ev.action === 'delete') {
      return this.openModal(ev.item.id);
    }
  }
}
