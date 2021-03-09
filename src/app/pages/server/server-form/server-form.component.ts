import { Parcel } from './../../../core/models/parcel';
import { Server } from './../../../core/models/server';
import { catchError } from 'rxjs/operators';
import { SnackbarService } from './../../../core/services/snackbar.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ServersService } from './../../../core/services/servers.service';
import { BaseFormComponent } from 'src/app/shared/components/base-form/base-form.component';
import { Component, OnInit, Injector } from '@angular/core';
import { EMPTY } from 'rxjs';
@Component({
  selector: 'app-server-form',
  templateUrl: './server-form.component.html',
  styleUrls: ['./server-form.component.scss']
})
export class ServerFormComponent extends BaseFormComponent<Server> {
  server: Server;
  // parcels: Parcel[];

  constructor(
    protected serverService: ServersService,
    protected injector: Injector
  ) {
    super(injector, serverService);
    this.setErrorAdded = 'Não foi possível adicionar o usuário!';
    this.setSuccessAdded = 'Servidor adicionado com sucesso!';
    this.setNavigate = ['/'];
  }

  buildForm() {
    this.form = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required]],
      shared: [false, [Validators.required]],
      hasDisease: [false, [Validators.required]],
      initialMoney: [0, [Validators.required]],
      initialStatsPoints: [0, [Validators.required]],
      parcels: [null]
    });
    if (this.route.snapshot.paramMap.get('id')) {
      this.editing = true;
      const id = this.route.snapshot.paramMap.get('id');
      this.serverService.getById(id).subscribe((server: Server) => {
        server.parcels.forEach(el => {
          el.id = null;
        });
        this.form.patchValue(server);
      });
    }
  }

  // submit() {
  //   let service;
  //   if (this.editing) {
  //     service = this.serverService.update(this.form.value);
  //   } else {
  //     service = this.serverService.create(this.form.value);
  //   }
  //   service
  //     .pipe(
  //       catchError(err => {
  //         if (err) {
  //           this.ngxSpinner.hide();
  //           console.log(err);
  //           this.snackBar.showMessage(
  //             `${
  //               this.editing
  //                 ? 'Erro ao salvar as alterações!'
  //                 : 'Não foi possível adicionar o usuário!'
  //             }`,
  //             true
  //           );
  //         }
  //         return EMPTY;
  //       })
  //     )
  //     .subscribe(res => {
  //       this.snackBar.showMessage(
  //         `${
  //           this.editing
  //             ? 'As alterações foram salvas com sucesso!'
  //             : 'Servidor adicionado com sucesso!'
  //         }`
  //       );
  //       console.log('sucesso', res);
  //       this.router.navigate(['/']);
  //     });
  // }
}
