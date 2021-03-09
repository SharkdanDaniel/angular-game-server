import { map} from 'rxjs/operators';
import { Job } from './../../../core/models/job';
import { Validators } from '@angular/forms';
import { JobsService } from './../../../core/services/jobs.service';
import { BaseFormComponent } from 'src/app/shared/components/base-form/base-form.component';
import { Component, Injector } from '@angular/core';

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.scss']
})
export class JobFormComponent extends BaseFormComponent<Job> {
  Job: Job;

  constructor(
    protected jobsService: JobsService,
    protected injector: Injector
  ) {
    super(injector, jobsService);
  }

  buildForm() {
    this.form = this.formBuilder.group({
      id: [null],
      name: ['', [Validators.required]],
      color: ['', [Validators.required]],
      canHeal: [false],
      canArrest: [false],
      canDoMarriage: [false],
      isDefault: [false],
      requirementXp: [0, [Validators.required]],
      publicJob: [false]
    });
    if (this.route.snapshot.paramMap.get('id')) {
      const id = this.route.snapshot.paramMap.get('id');
      this.editing = true;
      this.jobsService
        .getAll()
        .pipe(
          map((data: any) => {
            let array = data.filter(el => el.id === id);
            return array[0];
          })
        )
        .subscribe((job: Job) => {
          this.form.patchValue(job);
        });
    } else {
      this.ngxSpinner.show();
      setTimeout(() => {
        this.ngxSpinner.hide();
      }, 100);
    }
  }

  // submit() {
  //   let service;
  //   if (this.editing) {
  //     service = this.jobsService.update(this.form.value);
  //   } else {
  //     service = this.jobsService.create(this.form.value);
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
  //                 : 'Não foi possível adicionar a profissão!'
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
  //             : 'Profissão adicionado com sucesso!'
  //         }`
  //       );
  //       console.log('sucesso', res);
  //       this.router.navigate(['/jobs']);
  //     });
  // }
}
