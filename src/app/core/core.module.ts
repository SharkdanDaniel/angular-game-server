import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, HttpClientModule, NgbDropdownModule, RouterModule, MatSnackBarModule],
  exports: [HttpClientModule, HeaderComponent, NgbDropdownModule, MatSnackBarModule],
})
export class CoreModule {}
