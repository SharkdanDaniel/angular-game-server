import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { TableAction, TableColumn } from "./table-models.model";

@Component({
  selector: "atb-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"],
})
export class TableComponent implements OnInit {
  @Input() dataSource: any;
  @Input() totalItems: number;
  @Input() columns: TableColumn[];
  @Input() actions: TableAction[];
  @Output() page = new EventEmitter();
  @Output() action = new EventEmitter();

  currentPage = 0;
  pages = [{ index: 1 }, { index: 2 }, { index: 3 }];
  pageSize = 10;
  _columns: string[];

  constructor() {}

  ngOnInit() {
    this._columns = this.columns.map((x) => x.columnName);
    if (this.actions) {
      this._columns = [...this._columns, "actions"];
    }
  }

  getNumberOfElementsInCurrentPage() {}

  setPage(index) {
    this.currentPage = index - 1;
    this.page.emit(this.currentPage);
  }

  nextPage() {
    if (this.isNextPageDisabled()) return;

    if (this.currentPage === this.pages[2].index - 1) {
      this.currentPage++;
      this.pages = [];
      this.pages = [{ index: this.currentPage + 1 }, { index: this.currentPage + 2 }, { index: this.currentPage + 3 }];
      return;
    }
    this.currentPage++;
    this.page.emit(this.currentPage);
  }

  previousPage() {
    if (this.currentPage == 0) {
      return;
    }
    if (this.currentPage === this.pages[0].index - 1) {
      this.pages = [];
      this.pages = [{ index: this.currentPage - 2 }, { index: this.currentPage - 1 }, { index: this.currentPage }];
      this.currentPage--;
      return;
    }
    this.currentPage--;
    this.page.emit(this.currentPage);
  }

  isNextPageDisabled() {
    return !(this.totalItems > this.pageSize * (this.currentPage + 1));
  }

  onAction(action: TableAction, element: any) {
    this.action.emit({ action: action.eventName, element: element });
  }
}
