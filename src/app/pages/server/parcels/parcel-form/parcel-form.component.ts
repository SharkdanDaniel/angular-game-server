import { catchError } from 'rxjs/operators';
import { BaseFormComponent } from 'src/app/shared/components/base-form/base-form.component';
import { ServersService } from './../../../../core/services/servers.service';
import { SnackbarService } from './../../../../core/services/snackbar.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Server } from './../../../../core/models/server';
import { Parcel } from './../../../../core/models/parcel';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parcel-form',
  templateUrl: './parcel-form.component.html',
  styleUrls: ['./parcel-form.component.scss'],
})
export class ParcelFormComponent extends BaseFormComponent implements OnInit {
  server: Server;
  serverId: string;
  parcels: Parcel[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private ngxSpinner: NgxSpinnerService,
    private route: ActivatedRoute,
    protected modal: NgbModal,
    protected snackBar: SnackbarService,
    private serversService: ServersService
  ) {
    super(snackBar, modal);
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [null],
      parcelDescription: [null, [Validators.required]],
      parcelName: [null, [Validators.required]],
    });
    const id = this.route.snapshot.paramMap.get('id');
    this.serversService.getServerById(id).subscribe((data) => {
      this.parcels = data.parcels;
      this.server = data;
      this.serverId = data.id;
      if (this.route.snapshot.paramMap.get('pid')) {
        this.editing = true;
        const pId = this.route.snapshot.paramMap.get('pid');
        let form = this.parcels.filter((el) => el.id === pId);
        this.form.patchValue(form[0]);
      }
    });
  }

  submit() {
      if (!this.editing) {
        this.parcels.push(this.form.value);
        console.log(this.parcels);
      } else {
        Object.assign(
          this.parcels[
            this.parcels.findIndex((el) => el.id === this.form.value.id)
          ],
          this.form.value
        );
        console.log(this.parcels);
      }
      this.parcels.forEach((x) => {
        x.id = null;
      });
      this.server['parcels'] = this.parcels;
      this.serversService
        .updateServer(this.server)
        .pipe(
          catchError((err) => {
            console.log(err);
            this.snackBar.showMessage(
              this.editing
                ? 'Erro ao atualizar o mapa'
                : 'Erro ao criar o mapa',
              true
            );
            return err;
          })
        )
        .subscribe((res) => {
          if (this.editing) {
            console.log('parcel atualizado', res);
            this.snackBar.showMessage('Mapa atualizado com sucesso!');
          } else {
            console.log('parcel criada', res);
            this.snackBar.showMessage('Mapa criado com sucesso!');
          }
          this.router.navigate(['/server/', this.serverId, 'parcels']);
        });
  }
}
