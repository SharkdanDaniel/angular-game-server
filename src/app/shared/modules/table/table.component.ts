import { TableColumn, TableAction } from './table-models.model';
import { ModalConfirmComponent } from './../../components/modal-confirm/modal-confirm.component';
import { SnackbarService } from './../../../core/services/snackbar.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  Component,
  OnInit,
  Injectable,
  Input,
  EventEmitter,
  Output,
  HostListener,
} from '@angular/core';

@Injectable()
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  minHeight = '87%';

  @Input() data: any[] = [];

  @Input() title = 'Título';
  @Input() add = 'create';
  @Input() notFound = 'Nenhum dado encontrado';

  @Input() showBody = true;
  @Input() page = 1;
  @Input() pageSize = 4;
  @Input() collectionSize = 0;
  @Input() searchPlaceholder = 'Buscar dados';

  @Input() columns: TableColumn[];
  @Input() actions: TableAction[];

  @Output() action = new EventEmitter();
  @Output() refresh = new EventEmitter();

  constructor(
    protected ngxSpinner: NgxSpinnerService,
    protected modalService: NgbModal,
    protected snackBar: SnackbarService
  ) {}

  ngOnInit(): void {}

  refreshData() {
    this.ngxSpinner.show('table');
    this.pageSize > 4
      ? (this.minHeight = '100%')
      : this.pageSize < 4
      ? (this.minHeight = '73%')
      : (this.minHeight = '87%');
    this.showBody = false;
    setTimeout(() => {
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
      this.refresh.emit(true);
    }
  }

  onAction(action: TableAction, item: any) {
    this.action.emit({ action: action.eventName, item: item });
  }
}
