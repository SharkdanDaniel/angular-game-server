import { ServersService } from './../../../core/services/servers.service';
import { Disease } from './../../../core/models/disease';
import { map, catchError } from 'rxjs/operators';
import { BaseFormComponent } from 'src/app/shared/components/base-form/base-form.component';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { DiseaseService } from './../../../core/services/disease.service';
import { Component, OnInit } from '@angular/core';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-disease-form',
  templateUrl: './disease-form.component.html',
  styleUrls: ['./disease-form.component.scss'],
})
export class DiseaseFormComponent extends BaseFormComponent implements OnInit {
  constructor(
    private diseaseService: DiseaseService,
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
      name: [''],
      damageEachTenMinutes: [0],
      durationInMinutes: [0],
      contagious: [false],
      hasVacine: [false],
      vacinePrice: [0],
    });
    if (this.route.snapshot.paramMap.get('id')) {
      const id = this.route.snapshot.paramMap.get('id');
      this.editing = true;
      this.diseaseService
        .getDiseases()
        .pipe(
          map((data: any) => {
            let array = data.availableDisease.filter((el) => el.id === id);
            return array[0];
          })
        )
        .subscribe((dis: Disease) => {
          console.log(dis);
          this.form.patchValue(dis);
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
      service = this.diseaseService.updateDisease(
        Object.assign(this.form.value, {
          ServerId: this.serversService.getServerID(),
        })
      );
    } else {
      service = this.diseaseService.createDisease(this.form.value);
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
                  : 'Não foi possível adicionar o debuff!'
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
              : 'Debuff adicionado com sucesso!'
          }`
        );
        console.log('sucesso', res);
        this.router.navigate(['/disease']);
      });
  }
}
