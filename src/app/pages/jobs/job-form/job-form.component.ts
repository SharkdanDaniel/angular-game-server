import { map, catchError } from 'rxjs/operators';
import { Job } from './../../../core/models/job';
import { SnackbarService } from './../../../core/services/snackbar.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { JobsService } from './../../../core/services/jobs.service';
import { BaseFormComponent } from 'src/app/shared/components/base-form/base-form.component';
import { Component, OnInit } from '@angular/core';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.scss']
})
export class JobFormComponent extends BaseFormComponent implements OnInit {
  Job: Job;

  constructor(
    private jobsService: JobsService,
    // private serverService: ServersService,
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
      color: ['', [Validators.required]],
      canHeal: [false],
      canArrest: [false],
      canDoMarriage: [false],
      isDefault: [false],
      requirementXp: [0, [Validators.required]],
      publicJob: [false],
    });
    if (this.route.snapshot.paramMap.get('id')) {
      const id = this.route.snapshot.paramMap.get('id');
      this.editing = true;
      this.jobsService.getJobs().pipe(map((data: any) => {
        let array = data.filter((el) => el.id === id);
        return array[0];
      })).subscribe((job: Job) => {
        this.form.patchValue(job);
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
      service = this.jobsService.updateJob(this.form.value);
    } else {
      service = this.jobsService.createJob(this.form.value);
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
                  : 'Não foi possível adicionar a profissão!'
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
              : 'Profissão adicionado com sucesso!'
          }`
        );
        console.log('sucesso', res);
        this.router.navigate(['/jobs']);
      });
    }
}
