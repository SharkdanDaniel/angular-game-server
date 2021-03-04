import { catchError, map } from 'rxjs/operators';
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
import { EMPTY, pipe } from 'rxjs';

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
      id: [null],
      name: ['', [Validators.required]],
      health: [0],
      vest: [0],
      experience: [0],
      hungry: [0],
      money: [0],
      statusPoint: [0],
      quantityInitial: [0],
      isInitial: [false],
      isVirtual: [false],
    });
    if (this.route.snapshot.paramMap.get('id')) {
      const id = this.route.snapshot.paramMap.get('id');
      this.editing = true;
      this.itemService.getAll().pipe(map((data: any) => {
        let array = data.availableItems.filter((el) => el.id === id);
        return array[0];
      })).subscribe((item: Item) => {
        this.form.patchValue(item);
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
      service = this.itemService.update(this.form.value);
    } else {
      service = this.itemService.create(this.form.value);
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
                  : 'Não foi possível adicionar o item!'
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
              : 'Item adicionado com sucesso!'
          }`
        );
        console.log('sucesso', res);
        this.router.navigate(['/items']);
      });
  }
}
