import { TogglerModule } from './modules/toggler/toggler.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { TableModule } from './modules/table/table.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbCollapseModule, NgbPaginationModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerComponent } from './components/ngx-spinner/ngx-spinner.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ErrorMsgComponent } from './components/error-msg/error-msg.component';
import { InputFieldComponent } from './components/input-field/input-field.component';
import { BreadcrumpComponent } from './components/breadcrump/breadcrump.component';
import { ModalConfirmComponent } from './components/modal-confirm/modal-confirm.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Ng9PasswordStrengthBarModule } from 'ng9-password-strength-bar';
import { PasswordStrengthBarComponent } from './components/password-strength-bar/password-strength-bar.component';
import { InputSwitchModule } from 'primeng/inputswitch';

@NgModule({
  declarations: [
    NgxSpinnerComponent,
    ErrorMsgComponent,
    InputFieldComponent,
    BreadcrumpComponent,
    ModalConfirmComponent,
    PasswordStrengthBarComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbCollapseModule,
    NgxSpinnerModule,
    NgbPaginationModule,
    RouterModule,
    TableModule,
    NgbNavModule,
    MatIconModule,
    MatButtonModule,
    TogglerModule,
    MatFormFieldModule,
    InputSwitchModule,
    Ng9PasswordStrengthBarModule
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
    TableModule,
    NgbNavModule,
    MatIconModule,
    TogglerModule,
    MatButtonModule,
    MatFormFieldModule,
    InputSwitchModule,
    Ng9PasswordStrengthBarModule,
    PasswordStrengthBarComponent
  ],
})
export class SharedModule {}
