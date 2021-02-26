import { Server } from './../../../core/models/server';
import { ModalConfirmComponent } from './../../../shared/components/modal-confirm/modal-confirm.component';
import { SnackbarService } from './../../../core/services/snackbar.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  TableColumn,
  TableAction,
} from './../../../shared/modules/table/table-models.model';
import { Parcel } from './../../../core/models/parcel';
import { ActivatedRoute, Router } from '@angular/router';
import { ServersService } from '../../../core/services/servers.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parcels',
  templateUrl: './parcels.component.html',
  styleUrls: ['./parcels.component.scss'],
})
export class ParcelsComponent implements OnInit {
  server: Server;
  parcels: Parcel[] = [];
  pageSize = 4;

  columns: TableColumn[] = [
    {
      displayName: 'Nome',
      columnName: 'parcelName',
    },
    {
      displayName: 'Descrição',
      columnName: 'parcelDescription',
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
    const id = this.route.snapshot.paramMap.get('id');
    this.serversService.getServerById(id).subscribe((data) => {
      this.server = data;
      this.parcels = data.parcels;
    });
  }

  openModal(id: string) {
    const modalRef = this.modalService.open(ModalConfirmComponent, {
      centered: true,
      windowClass: 'h-75',
    });
    modalRef.componentInstance.title = 'Excluir mapa';
    modalRef.componentInstance.body =
      'Tem certeza que deseja excluir este mapa?';
    modalRef.componentInstance.button = 'danger';
    modalRef.componentInstance.action = 'Excluir';
    modalRef.result.then((res) => {
      if (res) {
        this.delete(id);
      }
    });
  }

  delete(pId: string) {
    if (pId) {
      this.parcels = this.parcels.reduce((count, arr) => {
        if (arr.id !== pId) {
          arr.id = null;
          count.push(arr);
        }
        return count;
      }, []);
      this.server['parcels'] = this.parcels;
      this.serversService.updateServer(this.server).subscribe((res) => {
        this.snackBar.showMessage('Mapa excluído com sucesso!');
        console.log('parcel excluído', res);
        this.router.navigate(['/server/', this.server.id, 'parcels']);
      }),
        (err) => {
          console.log(err);
          this.snackBar.showMessage('Não foi possível excluir este mapa', true);
        };
    }
  }

  onAction(ev: any) {
    if (ev.action === 'edit') {
      return this.router.navigate([
        `/server/${this.server.id}/parcels/edit/${ev.item.id}`,
      ]);
    }
    if (ev.action === 'delete') {
      return this.openModal(ev.item.id);
    }
  }
}
