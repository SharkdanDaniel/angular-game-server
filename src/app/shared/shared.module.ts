import { RouterModule } from '@angular/router';
import { TableModule } from './modules/table/table.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbCollapseModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerComponent } from './components/ngx-spinner/ngx-spinner.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ErrorMsgComponent } from './components/error-msg/error-msg.component';
import { InputFieldComponent } from './components/input-field/input-field.component';
import { BreadcrumpComponent } from './components/breadcrump/breadcrump.component';
import { ModalConfirmComponent } from './components/modal-confirm/modal-confirm.component';
@NgModule({
  declarations: [
    NgxSpinnerComponent,
    ErrorMsgComponent,
    InputFieldComponent,
    BreadcrumpComponent,
    ModalConfirmComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbCollapseModule,
    NgxSpinnerModule,
    NgbPaginationModule,
    RouterModule,
    TableModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbCollapseModule,
    NgxSpinnerComponent,
    NgxSpinnerModule,
    ErrorMsgComponent,
    InputFieldComponent,
    NgbPaginationModule,
    BreadcrumpComponent,
    TableModule
  ],
})
export class SharedModule {}
