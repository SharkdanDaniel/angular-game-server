import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, HttpClientModule, NgbDropdownModule],
  exports: [HttpClientModule, HeaderComponent, NgbDropdownModule],
})
export class CoreModule {}
