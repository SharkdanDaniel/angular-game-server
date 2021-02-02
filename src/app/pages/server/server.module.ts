import { ParcelsUpdateComponent } from './parcels/parcels-update/parcels-update.component';
import { ParcelsDeleteComponent } from './parcels/parcels-delete/parcels-delete.component';
import { ParcelsCreateComponent } from './parcels/parcels-create/parcels-create.component';
import { ParcelsComponent } from './parcels/parcels.component';
import { AvailableItemsUpdateComponent } from './available-items/available-items-update/available-items-update.component';
import { AvailableItemsDeleteComponent } from './available-items/available-items-delete/available-items-delete.component';
import { AvailableItemsCreateComponent } from './available-items/available-items-create/available-items-create.component';
import { AvailableItemsComponent } from './available-items/available-items.component';
import { ExpTableDeleteComponent } from './exp-table/exp-table-delete/exp-table-delete.component';
import { ExpTableCreateComponent } from './exp-table/exp-table-create/exp-table-create.component';
import { ExpTableUpdateComponent } from './exp-table/exp-table-update/exp-table-update.component';
import { ExpTableComponent } from './exp-table/exp-table.component';
import { ServerCreateComponent } from './server-create/server-create.component';
import { ServerUpdateComponent } from './server-update/server-update.component';
import { ServerProfileComponent } from './server-profile/server-profile.component';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServerRoutingModule } from './server-routing.module';
import { ServerComponent } from './server.component';


@NgModule({
  declarations: [
    ServerComponent,
    ServerProfileComponent,
    ServerUpdateComponent,
    ServerCreateComponent,
    ExpTableComponent,
    ExpTableUpdateComponent,
    ExpTableCreateComponent,
    ExpTableDeleteComponent,
    AvailableItemsComponent,
    AvailableItemsCreateComponent,
    AvailableItemsDeleteComponent,
    AvailableItemsUpdateComponent,
    ParcelsComponent,
    ParcelsCreateComponent,
    ParcelsDeleteComponent,
    ParcelsUpdateComponent
  ],
  imports: [
    CommonModule,
    ServerRoutingModule,
    SharedModule
  ]
})
export class ServerModule { }
