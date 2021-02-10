import { RouterModule } from '@angular/router';
import { AtbTableModule } from './modules/table/table.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbCollapseModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerComponent } from './components/ngx-spinner/ngx-spinner.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ErrorMsgComponent } from './components/error-msg/error-msg.component';
import { InputFieldComponent } from './components/input-field/input-field.component';
import { NavbarRouteComponent } from './components/navbar-route/navbar-route.component';
import { ModalConfirmComponent } from './components/modal-confirm/modal-confirm.component';
@NgModule({
  declarations: [
    NgxSpinnerComponent,
    ErrorMsgComponent,
    InputFieldComponent,
    NavbarRouteComponent,
    ModalConfirmComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbCollapseModule,
    NgxSpinnerModule,
    AtbTableModule,
    NgbPaginationModule,
    RouterModule
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
    AtbTableModule,
    NgbPaginationModule,
    NavbarRouteComponent
  ],
})
export class SharedModule {}
