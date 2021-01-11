import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [HeaderComponent, SpinnerComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    NgbDropdownModule,
    RouterModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    HttpClientModule,
    HeaderComponent,
    NgbDropdownModule,
    MatSnackBarModule,
    SpinnerComponent,
    MatProgressSpinnerModule
  ],
})
export class CoreModule {}
