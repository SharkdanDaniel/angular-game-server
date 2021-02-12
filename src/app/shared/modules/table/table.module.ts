import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgbPaginationPipe } from './../../pipes/ngb-pagination.pipe';
import { RouterModule } from '@angular/router';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';



@NgModule({
  declarations: [TableComponent, NgbPaginationPipe],
  imports: [
    CommonModule,
    NgbPaginationModule,
    RouterModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    TableComponent,
    NgbPaginationPipe,
    NgxSpinnerModule
  ],
})
export class TableModule { }
