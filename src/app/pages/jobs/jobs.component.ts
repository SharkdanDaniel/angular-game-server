import { ModalConfirmComponent } from './../../shared/components/modal-confirm/modal-confirm.component';
import { Router } from '@angular/router';
import { SnackbarService } from './../../core/services/snackbar.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  TableAction,
  TableColumn,
} from './../../shared/modules/table/table-models.model';
import { Job } from './../../core/models/job';
import { take } from 'rxjs/operators';
import { JobsService } from './../../core/services/jobs.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
})
export class JobsComponent implements OnInit {
  jobs: Job[] = [];
  pageSize = 4;

  columns: TableColumn[] = [
    {
      displayName: 'Nome',
      columnName: 'name',
    },
    {
      displayName: 'Cor',
      columnName: 'color',
    },
    {
      displayName: 'Pode curar',
      columnName: 'canHeal',
      className: 'text-center',
    },

    {
      displayName: 'Pode prender',
      columnName: 'canArrest',
      className: 'text-center',
    },
    {
      displayName: 'Pode casar',
      columnName: 'canDoMarriage',
      className: 'text-center',
    },
    {
      displayName: 'Padrão',
      columnName: 'isDefault',
      className: 'text-center',
    },
    {
      displayName: 'Xp necessária',
      columnName: 'requirementXp',
      className: 'text-center',
    },
    {
      displayName: 'Público',
      columnName: 'publicJob',
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
    private jobsService: JobsService,
    protected ngxSpinner: NgxSpinnerService,
    private modalService: NgbModal,
    private snackBar: SnackbarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.jobsService.getJobs().subscribe((res) => {
      // console.log(res);
      this.jobs = res;
    });
  }

  openModal(id: string) {
    const modalRef = this.modalService.open(ModalConfirmComponent, {
      centered: true,
      windowClass: 'h-75',
    });
    modalRef.componentInstance.title = 'Excluir profissão';
    modalRef.componentInstance.body =
      'Tem certeza que deseja excluir esta profissão?';
    modalRef.componentInstance.button = 'danger';
    modalRef.componentInstance.action = 'Excluir';
    modalRef.result.then((res) => {
      if (res) {
        this.delete(id);
      }
    });
  }

  delete(id: string) {
    this.jobsService.deleteJob(id).subscribe((res) => {
      this.jobs = this.jobs.filter((el) => el.id != id);
      console.log('Item deletado', res);
      this.getAll();
      this.snackBar.showMessage('Item excluído com sucesso!');
    }),
      (err) => {
        console.log(err);
        this.snackBar.showMessage('Não foi possível excluir este item', true);
      };
  }

  onAction(ev: any) {
    if (ev.action === 'edit') {
      return this.router.navigate(['/jobs/update', ev.item.id]);
    }
    if (ev.action === 'delete') {
      return this.openModal(ev.item.id);
    }
  }
}
