import { ModalConfirmComponent } from './../../components/modal-confirm/modal-confirm.component';
import { SnackbarService } from './../../../core/services/snackbar.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit, Injectable, Input } from '@angular/core';

@Injectable()
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() data: any[] = [];
  @Input() dataBkp: any[] = [];

  @Input() title = 'Título';

  @Input() showBody = true;
  @Input() page = 1;
  @Input() pageSize = 4;
  @Input() collectionSize = 0;
  @Input() searchPlaceholder = 'Buscar dados';

  constructor(
    protected ngxSpinner: NgxSpinnerService,
    protected modalService: NgbModal,
    protected snackBar: SnackbarService
  ) {}

  ngOnInit(): void {
    console.log();
  }

  refreshAll() {
    this.ngxSpinner.show('table');
    this.showBody = false;
    setTimeout(() => {
      this.data = this.dataBkp;
      this.showBody = true;
      this.ngxSpinner.hide('table');
    }, 150);
  }

  refreshData() {
    this.ngxSpinner.show('table');
    this.showBody = false;
    setTimeout(() => {
      //   this.data = this.dataBkp.slice(
      //     (this.page - 1) * this.pageSize,
      //     (this.page - 1) * this.pageSize + this.pageSize
      //   );
      this.showBody = true;
      this.ngxSpinner.hide('table');
    }, 150);
  }

  searchData(ev) {
    let value = ev;
    if (value.trim() != '') {
      this.ngxSpinner.show('table');
      setTimeout(() => {
        this.data = this.data.filter((data: any) => {
          this.ngxSpinner.hide('table');
          return data.name.toLowerCase().indexOf(value.toLowerCase()) > -1;
        });
      }, 200);
    }
  }

  onKey(ev) {
    let value = ev.target.value;
    if (value == '') {
      this.refreshAll();
    }
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
        // this.delete(id);
      }
    });
  }
}
