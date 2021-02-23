import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { TogglerComponent } from "./toggler.component";

@NgModule({
  imports: [CommonModule],
  exports: [TogglerComponent],
  declarations: [TogglerComponent],
  providers: [],
})
export class TogglerModule {}
