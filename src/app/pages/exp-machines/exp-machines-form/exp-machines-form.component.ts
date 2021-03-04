import { ExpMachine } from './../../../core/models/exp-machine';
import { catchError, map } from 'rxjs/operators';
import { BaseFormComponent } from 'src/app/shared/components/base-form/base-form.component';
import { SnackbarService } from './../../../core/services/snackbar.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ExpMachinesService } from './../../../core/services/exp-machines.service';
import { Component, OnInit } from '@angular/core';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-exp-machines-form',
  templateUrl: './exp-machines-form.component.html',
  styleUrls: ['./exp-machines-form.component.scss']
})
export class ExpMachinesFormComponent extends BaseFormComponent
  implements OnInit {
  constructor(
    private expMachine: ExpMachinesService,
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
      description: ['', [Validators.required]],
      expEachMinute: [0, [Validators.required]],
      automaticStart: [false, [Validators.required]],
      hourStart: ['', [Validators.required]],
      hourEnds: ['', [Validators.required]],
      enabled: [false, [Validators.required]]
    });
    if (this.route.snapshot.paramMap.get('id')) {
      const id = this.route.snapshot.paramMap.get('id');
      this.editing = true;
      this.expMachine
        .getAll()
        .pipe(
          map((data: any) => {
            let array = data.filter(el => el.id === id);
            return array[0];
          })
        )
        .subscribe((exp: ExpMachine) => {
          this.form.patchValue(exp);
        });
    } else {
      this.ngxSpinner.show();
      setTimeout(() => {
        this.ngxSpinner.hide();
      }, 100);
    }
  }

  submit() {
    this.expMachine
      .update(this.form.value)
      .pipe(
        catchError(err => {
          if (err) {
            this.ngxSpinner.hide();
            console.log(err);
            this.snackBar.showMessage(
              `${
                this.editing
                  ? 'Erro ao salvar as alterações!'
                  : 'Não foi possível adicionar a máquina de xp!'
              }`,
              true
            );
          }
          return EMPTY;
        })
      )
      .subscribe(res => {
        this.snackBar.showMessage(
          `${
            this.editing
              ? 'As alterações foram salvas com sucesso!'
              : 'Máquina de xp adicionado com sucesso!'
          }`
        );
        console.log('sucesso', res);
        this.router.navigate(['/exp-machines']);
      });
  }
}
