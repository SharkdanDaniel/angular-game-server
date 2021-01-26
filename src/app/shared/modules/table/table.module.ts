import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TableComponent } from "./table.component";
import { MatTableModule } from "@angular/material/table";
import { PagePipe } from "./page.pipe";
import { NgbDropdownModule } from "@ng-bootstrap/ng-bootstrap";
import { FirstLetterCapitalPipe } from "./first-letter-capital.pipe";

@NgModule({
  declarations: [TableComponent, PagePipe, FirstLetterCapitalPipe],
  imports: [CommonModule, MatTableModule, NgbDropdownModule],
  exports: [TableComponent, FirstLetterCapitalPipe],
})
export class AtbTableModule {}
