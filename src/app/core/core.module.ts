import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { NgbDropdownModule, NgbNavModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule} from '@angular/material/list';
@NgModule({
  declarations: [HeaderComponent, SpinnerComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    NgbDropdownModule,
    RouterModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    NgbNavModule,
    NgbCollapseModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule
  ],
  exports: [
    HttpClientModule,
    HeaderComponent,
    NgbDropdownModule,
    MatSnackBarModule,
    SpinnerComponent,
    MatProgressSpinnerModule,
    NgbNavModule,
    NgbCollapseModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule
  ],
})
export class CoreModule {}
