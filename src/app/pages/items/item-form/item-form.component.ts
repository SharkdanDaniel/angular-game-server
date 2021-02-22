import { catchError } from 'rxjs/operators';
import { Item } from './../../../core/models/item';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ServersService } from './../../../core/services/servers.service';
import { ItemsService } from './../../../core/services/items.service';
import { BaseFormComponent } from 'src/app/shared/components/base-form/base-form.component';
import { Component, OnInit } from '@angular/core';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss'],
})
export class ItemFormComponent extends BaseFormComponent implements OnInit {
  item: Item;
  constructor(
    private itemService: ItemsService,
    private serverService: ServersService,
    private formBuilder: FormBuilder,
    private router: Router,
    private ngxSpinner: NgxSpinnerService,
    private route: ActivatedRoute,
    protected modal: NgbModal,
    protected snackBar: SnackbarService
  ) {
    super(snackBar, modal);
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      permission: [null, [Validators.required]],
      serverId: [this.serverService.getServerID()],
    });
    this.item = this.itemService.getItems();
    if (this.route.snapshot.paramMap.get('id')) {
      this.editing = true;
      const id = this.route.snapshot.paramMap.get('id');
      this.itemService.getItems().subscribe((item: Item) => {
        // this.form = this.formBuilder.group(user)
        // this.form = this.formBuilder.group({
        //   id: [user.id],
        //   name: [user.name, [Validators.required]],
        //   email: [user.email, [Validators.required, Validators.email]],
        //   password: [user.password, [Validators.required]],
        //   permission: [user.permission, [Validators.required]],
        //   serverId: [user.server ? user.server.id : ''],
        // });
        console.log(this.form);
      });
    } else {
      this.ngxSpinner.show();
      setTimeout(() => {
        this.ngxSpinner.hide();
      }, 100);
    }
  }

  submit() {
    let service;
    if (this.editing) {
      service = this.itemService.updateItem(this.form.value);
    } else {
      service = this.itemService.createItem(this.form.value);
    }
    service
      .pipe(
        catchError((err) => {
          if (err) {
            this.ngxSpinner.hide();
            console.log(err);
            this.snackBar.showMessage(
              `${
                this.editing
                  ? 'Erro ao salvar as alterações!'
                  : 'Não foi possível adicionar o usuário!'
              }`,
              true
            );
          }
          return EMPTY;
        })
      )
      .subscribe((res) => {
        this.snackBar.showMessage(
          `${
            this.editing
              ? 'As alterações foram salvas com sucesso!'
              : 'Usuário adicionado com sucesso!'
          }`
        );
        console.log('sucesso', res);
        this.router.navigate(['/users']);
      });
  }
}
