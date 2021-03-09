import { Server } from './../../../../core/models/server';
import { ExpTable } from './../../../../core/models/exp-table';
import { map, catchError } from 'rxjs/operators';
import { BaseFormComponent } from 'src/app/shared/components/base-form/base-form.component';
import { ServersService } from './../../../../core/services/servers.service';
import { Validators } from '@angular/forms';
import { Component, Injector } from '@angular/core';

@Component({
  selector: 'app-exp-table-form',
  templateUrl: './exp-table-form.component.html',
  styleUrls: ['./exp-table-form.component.scss']
})
export class ExpTableFormComponent extends BaseFormComponent<any> {
  serverId: string;
  expTables: ExpTable[] = [];

  constructor(
    protected injector: Injector,
    protected serversService: ServersService
  ) {
    super(injector, serversService);
  }

  buildForm() {
    this.form = this.formBuilder.group({
      id: [null],
      title: [null, [Validators.required]],
      exp: [null, [Validators.required]],
      level: [null, [Validators.required]]
    });
    this.serverId = this.route.snapshot.paramMap.get('id');
    this.serversService
      .getById(this.serverId)
      .pipe(
        map((data: Server) => {
          return data.expTable;
        })
      )
      .subscribe((data: ExpTable[]) => {
        this.expTables = data;
        if (this.route.snapshot.paramMap.get('expid')) {
          const id = this.route.snapshot.paramMap.get('expid');
          this.editing = true;
          let form = data.filter(el => el.id === id);
          this.form.patchValue(form[0]);
        }
      });
  }

  submit() {
    if (!this.editing) {
      this.expTables.push(this.form.value);
      console.log(this.expTables);
    } else {
      Object.assign(
        this.expTables[
          this.expTables.findIndex(el => el.id === this.form.value.id)
        ],
        this.form.value
      );
      console.log(this.expTables);
    }
    this.expTables.forEach(x => {
      x.id = null;
    });
    this.serversService
      .updateExpTable(this.serverId, this.expTables)
      .pipe(
        catchError(err => {
          console.log(err);
          this.snackBar.showMessage(
            this.editing
              ? 'Erro ao atualizar a tabela de xp'
              : 'Erro ao criar a tabela de xp',
            true
          );
          return err;
        })
      )
      .subscribe(res => {
        if (this.editing) {
          console.log('expTable atualizada', res);
          this.snackBar.showMessage('Tabela de xp atualizada com sucesso!');
        } else {
          console.log('expTable criada', res);
          this.snackBar.showMessage('Tabela de xp criada com sucesso!');
        }
        this.router.navigate(['/server/', this.serverId, 'exptable']);
      });
  }
}
