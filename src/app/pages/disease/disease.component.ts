import { ModalConfirmComponent } from './../../shared/components/modal-confirm/modal-confirm.component';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  TableColumn,
  TableAction,
} from './../../shared/modules/table/table-models.model';
import { Disease } from './../../core/models/disease';
import { take } from 'rxjs/operators';
import { DiseaseService } from './../../core/services/disease.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-disease',
  templateUrl: './disease.component.html',
  styleUrls: ['./disease.component.scss'],
})
export class DiseaseComponent implements OnInit {
  diseases: Disease[] = [];
  pageSize = 4;

  columns: TableColumn[] = [
    {
      displayName: 'Nome',
      columnName: 'name',
    },
    {
      displayName: 'Dano por minuto',
      columnName: 'damageEachTenMinutes',
      className: 'text-center',
    },
    {
      displayName: 'Duração',
      columnName: 'damageEachTenMinutes',
      className: 'text-center',
    },
    {
      displayName: 'Contagioso',
      columnName: 'contagious',
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
    private diseaseService: DiseaseService,
    protected ngxSpinner: NgxSpinnerService,
    private modalService: NgbModal,
    private snackBar: SnackbarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.diseaseService
      .getDiseases()
      .pipe(take(1))
      .subscribe((data) => {
        this.diseases = data.availableDisease;
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

  delete(id: string) {
    this.diseaseService.deleteDisease(id).subscribe((res) => {
      this.diseases = this.diseases.filter((el) => el.id != id);
      console.log('Item deletado', res);
      this.getAll();
      this.snackBar.showMessage('Debuff excluído com sucesso!');
    }),
      (err) => {
        console.log(err);
        this.snackBar.showMessage('Não foi possível excluir este debuff', true);
      },
      (res) => {};
  }

  onAction(ev: any) {
    if (ev.action === 'edit') {
      return this.router.navigate(['/disease/update', ev.item.id]);
    }
    if (ev.action === 'delete') {
      return this.openModal(ev.item.id);
    }
  }
}
